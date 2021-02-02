import http.server
import socketserver

PORT = 89
HOST = "0.0.0.0"
DIRECTORY = '.'  # 'livedash' when served from OpenPilot location 'openpilot/selfdrive/livedash'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


def main():
  with socketserver.ThreadingTCPServer((HOST, PORT), Handler) as httpd:
    print(f"Serving at host {HOST} port {PORT}")
    while True:
      httpd.serve_forever()

if __name__ == "__main__":
  main()