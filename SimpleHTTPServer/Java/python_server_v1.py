# Very simple HTTP server written in python.
# (Missing most features and error checks.)
# The indentation is a bit obnoxious, but I figure it 
# makes the code easier to follow (than jumping in and 
# out of functions)
# Based on https://realpython.com/python-sockets/

import socket

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 8081  # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
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

            # This part gets replaced in Express.
            # file_name is no longer a file name, but a key used to 
            # identify the code that will generate the content
            file_name = parts[1][1:]

            with open(file_name, 'r') as file:
                conn.sendall("HTTP/1.0 200 OK\n".encode('utf-8'))
                conn.sendall("Content-Type: text/plain\n".encode('utf-8'))
                conn.sendall("\n".encode('utf-8'))

                while line := file.readline():
                    conn.sendall(line.encode('utf-8'))
                
            conn.close()
