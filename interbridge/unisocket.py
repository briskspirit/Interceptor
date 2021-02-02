#!/usr/bin/env python
import struct, pickle, json
from base64 import b64encode
from hashlib import sha1
from socketserver import ThreadingTCPServer, StreamRequestHandler
from socket import timeout as SocketTimeoutError
# import ssl


class MixedSocketServer(ThreadingTCPServer):

  allow_reuse_address = True
  request_queue_size = 128
  daemon_threads = True

  clients = []
  id_counter = 0

  def __init__(self, addr):
    host, port = addr.split(':')
    self.addr = (host, int(port))
    self.allow_reuse_address = True
    ThreadingTCPServer.__init__(self, self.addr, MixedSocketHandler)
    self.port = self.socket.getsockname()[1]

# For SSL (wss://) WebSocket use:

  # def server_bind(self):
  #   ThreadingTCPServer.server_bind(self)
  #   self.socket = ssl.wrap_socket(
  #     self.socket, server_side=True,
  #     certfile='certPlusKey.pem',
  #   do_handshake_on_connect=False)

  # def get_request(self):
  #   (socket, addr) = ThreadingTCPServer.get_request(self)
  #   socket.do_handshake()
  #   return (socket, addr)

  def _msg_received_(self, handler, msg):
    self.msg_received(self.handler_to_client(handler), self, msg)

  def _client_add_(self, handler):
    self.id_counter += 1
    client = {
            'id': self.id_counter,
            'handler': handler,
            'addr': handler.client_address # (ip, port) tuple
            }
    self.clients.append(client)
    self.new_client(client, self)

  def _client_remove_(self, handler):
    client = self.handler_to_client(handler)
    self.client_left(client, self)
    if client in self.clients:
      self.clients.remove(client)

  def unicast(self, to_client, msg):
    to_client['handler'].write_msg(msg)

  def broadcast(self, msg):
    for client in self.clients:
      self.unicast(client, msg)

  def handler_to_client(self, handler):
    for client in self.clients:
      if client['handler'] == handler:
        return client

  def count_clients(self):
    return len(self.clients)

  # Callback dummy functions, could be replaced with needed callbacks
  def service_actions(self): # Additional actions for main server loop
    pass

  def new_client(self, client, server): 
    pass

  def client_left(self, client, server):
    pass


MASK = 0x80
FIN    = 0x80
OPCODE = 0x0f
OPCODE_TEXT = 0x1
OPCODE_CLOSE_REQ = 0x8
PAYLOAD_LEN = 0x7f
PAYLOAD_LEN_EXT16 = 0x7e
PAYLOAD_LEN_EXT64 = 0x7f

GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'.encode()


class MixedSocketHandler(StreamRequestHandler):

  def __init__(self, socket, addr, server):
    self.server = server
    self.timeout = 5
    StreamRequestHandler.__init__(self, socket, addr, server)

  def setup(self):
    StreamRequestHandler.setup(self)
    self.is_connected = True
    self.handshaked = False
    self.is_websocket = True

  def handle(self):
    while self.is_connected:
      if not self.handshaked:
        self.handshake()
      else:
        self.read_msg()

  def read_msg(self):
    if self.is_websocket:
      self.read_websocket()
    else:
      self.read_socket()

  def read_websocket(self):
    try:
      b1, b2 = self.rfile.read(2)
    except (ConnectionResetError, ValueError, TimeoutError, SocketTimeoutError):
      self.is_connected = False
      self.handshaked = False
      return

    fin = b1 & FIN
    opcode = b1 & OPCODE
    masked = b2 & MASK
    payload_len = b2 & PAYLOAD_LEN

    if not masked:
      # Client must mask messages and server is not
      self.is_connected = False
      return

    if opcode == OPCODE_TEXT:
      pass
    elif opcode == OPCODE_CLOSE_REQ:
      self.is_connected = False
      return
    else:
      # Unknown opcode received
      self.is_connected = False
      return

    if payload_len == 126:
      payload_len = struct.unpack(">H", self.rfile.read(2))[0]
    elif payload_len == 127:
      payload_len = struct.unpack(">Q", self.rfile.read(8))[0]

    masks = self.rfile.read(4)
    msg_bytes = bytearray()
    for msg_byte in self.rfile.read(payload_len):
      msg_byte ^= masks[len(msg_bytes) % 4]
      msg_bytes.append(msg_byte)
    try:
      self.server._msg_received_(self, json.loads(msg_bytes))
    except json.decoder.JSONDecodeError:
      self.server._msg_received_(self, msg_bytes.decode())

  def read_socket(self):
    try:
      payload = self.rfile.read(4)
      payload_len = struct.unpack('!I', payload)[0]
    except ConnectionResetError: #(socket.error, struct.error):
      self.is_connected = False
      self.handshaked = False
      return

    payload = bytearray()
    payload += self.rfile.read(payload_len)
    self.server._msg_received_(self, pickle.loads(payload))

  def write_msg(self, msg, opcode=OPCODE_TEXT):
    if self.is_websocket:
      self.write_websocket(msg, opcode)
    else:
      self.write_socket(msg)

  def write_websocket(self, msg, opcode=OPCODE_TEXT):
    if not msg:
      return
    # Validate message
    if not isinstance(msg, (bytes, bytearray)):
      msg = json.dumps(msg, skipkeys=True).encode()

    header  = bytearray()
    payload = msg
    payload_len = len(payload)

    if payload_len <= 125:
      header.append(FIN | opcode)
      header.append(payload_len)
    elif payload_len >= 126 and payload_len <= 65535:
      header.append(FIN | opcode)
      header.append(PAYLOAD_LEN_EXT16)
      header.extend(struct.pack(">H", payload_len))
    elif payload_len < 18446744073709551616:
      header.append(FIN | opcode)
      header.append(PAYLOAD_LEN_EXT64)
      header.extend(struct.pack(">Q", payload_len))

    try:
      #self.request.send(header + payload)
      self.wfile.write(header + payload)
      return
    except (ConnectionAbortedError, OSError):
      self.is_connected = False
      self.handshaked = False
      return

  def write_socket(self, msg):
    if not msg:
      return
    if isinstance(msg, str):
      msg = msg.encode()

    payload = pickle.dumps(msg)
    payload_len = struct.pack('!I', len(payload))
    try:
      #self.request.send(payload_len + payload)
      self.wfile.write(payload_len + payload)
      return
    except (ConnectionResetError, BrokenPipeError):
      self.is_connected = False
      self.handshaked = False
      return

  def get_headers(self):
    headers = {}
    http_get = self.rfile.readline().decode().strip()
    if http_get.upper()[:3] == 'GET':
      while True:
        header = self.rfile.readline().decode().strip()
        if not header:
          break
        k, v = header.split(':', 1)
        headers[k.lower().strip()] = v.strip()
    return headers

  def handshake(self):
    headers = self.get_headers()
    if not headers:
      self.is_websocket = False
      self.handshaked = True
      self.server._client_add_(self)
      return

    if 'sec-websocket-key' not in headers:
      self.is_connected = False
      return

    key = headers['sec-websocket-key']
    res = self.handshake_res(key)
    #self.handshaked = self.request.send(res.encode())
    self.handshaked = self.wfile.write(res.encode())
    self.server._client_add_(self)

  def handshake_res(self, key):
    res = 'HTTP/1.1 101 Switching Protocols\r\n'\
          'Upgrade: websocket\r\n'\
          'Connection: Upgrade\r\n'\
          f'Sec-WebSocket-Accept: {self.calc_key(key)}\r\n\r\n'
    return res

  def calc_key(self, key):
    hash = sha1(key.encode() + GUID)
    res_key = b64encode(hash.digest()).strip()
    return res_key.decode('ASCII')

  def finish(self):
    self.server._client_remove_(self)
    StreamRequestHandler.finish(self)
