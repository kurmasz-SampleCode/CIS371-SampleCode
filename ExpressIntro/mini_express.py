# A very simple implementation of an "ExpressJS-like" server
# Based on https://realpython.com/python-sockets/

import socket
import re
import __main__ as main_mod

class MiniExpress:

    HOST = "127.0.0.1"  # Standard loopback interface address (localhost)

    def __init__(self):
        self.routes = {}

    def serve(self, port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((self.HOST, port))
            s.listen()
            while True:
                conn, addr = s.accept()
                with conn:
                    print(f"Connected by {addr}")
                    sock_file = conn.makefile('r')
                    first_line = sock_file.readline()

                    # Read headers
                    while True:
                        data = sock_file.readline()
                        if (not data) or (len(data.strip()) == 0):
                            break
                        print(len(data))
                        print(data, end='')
                    print('=======')

                    parts = first_line.split(' ')
                    print(parts)

                    params = {}
                    if '?' in parts[1]:
                        route, query_string = parts[1].split('?')[0:2]
                        for kv in query_string.split('&'):
                            k, v = kv.split('=')
                            params[k] = v
                    else:
                        route = parts[1]

                    if route in self.routes:
                        data = self.routes[route](params)
                        conn.sendall("HTTP/1.0 200 OK\n".encode('utf-8'))
                        conn.sendall(
                            "Content-Type: text/plain\n".encode('utf-8'))
                        conn.sendall(
                            f"Content-length: {len(data)}\n".encode('utf-8'))
                        conn.sendall("\n".encode('utf-8'))
                        conn.sendall(data.encode('utf-8'))
                    else:
                        data = f"Route {route} is not recognized."
                        conn.sendall(
                            "HTTP/1.0 404 NOT FOUND\n".encode('utf-8'))
                        conn.sendall(
                            "Content-Type: text/plain\n".encode('utf-8'))
                        conn.sendall(
                            f"Content-length: {len(data)}\n".encode('utf-8'))
                        conn.sendall("\n".encode('utf-8'))
                        conn.sendall(data.encode('utf-8'))

                    conn.close()

    def add_route(self, name, action):
        self.routes[name] = action


    def make_routes(self, module=main_mod):
        all_functions = dir(main_mod)
        route_functions = list(filter(lambda i : i.endswith('_route'), all_functions))
        for rf in route_functions:
            m = re.search('(.*)_route', rf)
            name = m.group(1)
            self.routes[name] = getattr(module, rf)


