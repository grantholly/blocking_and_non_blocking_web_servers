from http.server import BaseHTTPRequestHandler, HTTPServer
import random
import time
import json


HOST = "127.0.0.1"
PORT = 9090

class BlockingServer(BaseHTTPRequestHandler):
    def do_GET(self):
        nap_time = random.randint(1, 10)
        print(f'napping for {nap_time} seconds')
        time.sleep(nap_time)
        payload = {"nap": nap_time}
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        payload = json.dumps(payload)
        self.wfile.write(bytes(payload, "utf-8"))

if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), BlockingServer)
    print(f"starting server on http://{HOST}:{PORT}")
    server.serve_forever()
