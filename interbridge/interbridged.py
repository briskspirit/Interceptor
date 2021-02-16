#!/usr/bin/env python
from .unisocket import MixedSocketServer
from threading import Thread
import cereal.messaging as messaging
from common.realtime import Ratekeeper
from queue import SimpleQueue as Queue
import json

RATE = 20.  # In Hz
PORT = 8989
OP_PARAMS_PATH = '/data/op_params.json'


class InterBridge:
  publishers = [
    'thermal',
    'controlsState',
    'health',
    'radarState',
    'liveCalibration',
    'carState',
    'carControl',
    'longitudinalPlan',
    #'liveLocation',
    #'liveMpc',
    #'liveLongitudinalMpc',
    'liveParameters',
    'cameraOdometry',
    'lateralPlan',
    'carParams',
    'frontFrame',
    'driverState',
    'driverMonitoringState',
    #'modelV2',
    'testJoystick',
  ]

  def __init__(self, sm=None, pm=None, can_sock=None):
    # Initialize received messages queue
    self.msgs_queue = Queue()

    # Setup sockets
    self.pm = pm
    if self.pm is None:
      self.pm = messaging.PubMaster(['testJoystick'])

    self.sm = sm
    if self.sm is None:
      self.sm = messaging.SubMaster(self.publishers)

    self.rk = Ratekeeper(RATE, print_delay_threshold=None)

  def sock_msg_received(self, client, server, msg):
    self.msgs_queue.put(msg)

  def sock_msg_send(self, msg):
    pass

  def step(self):
    # Send msg from ZMQ to Socket, only if there are connected clients
    if self.count_clients():
      self.sm.update(0)
      send_msg = {}
      for publisher in self.publishers:
        if self.sm.updated[publisher]:
          send_msg[publisher] = self.sm[publisher].to_dict()
          send_msg[publisher]['logMonoTime'] = self.sm.logMonoTime[publisher]
          # Hack, convert known bytes value to hex (bytes are not serializable)
          if publisher == 'carParams' and send_msg[publisher]['carFw']:
            for idx, val in enumerate(send_msg[publisher]['carFw']):
              send_msg[publisher]['carFw'][idx]['fwVersion'] = val['fwVersion'].hex()

      if send_msg:
        self.sock_msg_send(send_msg)

    # Send msg from Socket to ZMQ (only testJoystick!)
    while not self.msgs_queue.empty():
      msg = self.msgs_queue.get()

      if 'opEdit' in msg:
        if 'loadRequest' in msg['opEdit']:
          try:
            with open(OP_PARAMS_PATH, 'r') as file:
              data = file.read()
              self.sock_msg_send({'opEdit': json.loads(data)})
          except (FileNotFoundError, PermissionError):
            self.sock_msg_send({'error': "File op_params.json not found."})
        else:
          try:
            with open(OP_PARAMS_PATH, 'w') as file:
              file.write(json.dumps(msg['opEdit'], indent=2))
          except PermissionError:
            self.sock_msg_send({'error': "Can't write op_params.json, not enough permissions."})

      elif 'testJoystick' in msg:
        dat = messaging.new_message('testJoystick')
        testJoystick = dat.testJoystick
        testJoystick.axes = msg['testJoystick']['axes']
        testJoystick.buttons = msg['testJoystick']['buttons']
        testJoystick.enabled = msg['testJoystick']['enabled']
        testJoystick.axesMode = msg['testJoystick']['axesMode']
        self.pm.send('testJoystick', dat)

  def interbridged_thread(self, count_callback):
    self.count_clients = count_callback
    while True:
      self.step()
      self.rk.keep_time()


def main(sm=None, pm=None, logcan=None):
  bridge = InterBridge(sm, pm, logcan)
  sock_server = MixedSocketServer('0.0.0.0:'+str(PORT))
  sock_server.msg_received = bridge.sock_msg_received
  bridge.sock_msg_send = sock_server.broadcast
  ib_thread = Thread(
    name='InterBridge',
    target=bridge.interbridged_thread,
    args=(sock_server.count_clients, ),
    daemon=True)
  ib_thread.start()
  while True:  # Server stops on error and needs to be restarted?
    sock_server.serve_forever()

if __name__ == "__main__":
  main()
