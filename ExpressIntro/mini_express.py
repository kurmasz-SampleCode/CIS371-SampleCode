# A very simple implementation of an "ExpressJS-like" server
# Based on https://realpython.com/python-sockets/

import socket


def serve(routes, port):
    HOST = "127.0.0.1"  # Standard loopback interface address (localhost)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, port))
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

                if route in routes:
                    data = routes[route](params)
                    conn.sendall("HTTP/1.0 200 OK\n".encode('utf-8'))
                    conn.sendall("Content-Type: text/plain\n".encode('utf-8'))
                    conn.sendall(
                        f"Content-length: {len(data)}\n".encode('utf-8'))
                    conn.sendall("\n".encode('utf-8'))
                    conn.sendall(data.encode('utf-8'))
                else:
                    data = f"Route {route} is not recognized."
                    conn.sendall("HTTP/1.0 404 NOT FOUND\n".encode('utf-8'))
                    conn.sendall("Content-Type: text/plain\n".encode('utf-8'))
                    conn.sendall(
                        f"Content-length: {len(data)}\n".encode('utf-8'))
                    conn.sendall("\n".encode('utf-8'))
                    conn.sendall(data.encode('utf-8'))

                conn.close()
