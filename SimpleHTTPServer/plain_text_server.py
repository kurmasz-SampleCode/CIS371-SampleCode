"""
plain_text_server.py

This is a very simple HTTP server that can can respond to request for plain text files.

GVSU CIS 371 2025
"""

import os
import socket
import http_socket
import argparse

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 8081  # Port to listen on (non-privileged ports are > 1023)


def handle_connection(connection):
    """
    Handle the "conversation" with a single client connection
    """
    socket = http_socket.HTTPSocket(connection)

    # Read and print the request (e.g. "GET / HTTP/1.0")
    request = socket.receive_text_line()
    print(f"Request: {request}")


    # Read and print the request headers
    while True:
        data = socket.receive_text_line().strip()
        if (not data) or (len(data) == 0):
                break
        print(data)
    print('=======')

    # Extract the path from the request.
    parts = request.split()
    path = parts[1][1:]  # remove the first character of the path

    # Assume the path is a file name.
    # If the file name exists, we will send it as a response.
    # Otherwise, send a 404.
    if os.path.exists(path):

        # We need to know the file size so we can send
        # the Content-Length header.
        file_size = os.path.getsize(path)
        with open(path, 'r') as file:
            socket.send_text_line("HTTP/1.0 200 OK")
            socket.send_text_line("Content-Type: text/plain")
            socket.send_text_line(f"Content-Length: {file_size}")
            socket.send_text_line(f"Connection: close")
            socket.send_text_line("")

            # Read and send one line at a time.
            # (This works because this server only handles text.)    
            while line := file.readline():
                socket.send_text_line(line)
    else:
        message = f"File '{path}' not found."

        socket.send_text_line("HTTP/1.0 404 NOT FOUND")
        socket.send_text_line("Content-Type: text/plain")
        socket.send_text_line(f"Content-Length: {len(message) + 2}") # +2 for CR/LF
        socket.send_text_line(f"Connection: close")
        socket.send_text_line("")
        socket.send_text_line(message)

    socket.close()

def main():
    """
    Parse arguments and set up the server socket
    """ 
    
    # Set up the argument parser
    parser = argparse.ArgumentParser(description="A simple plain text HTTP server")
    parser.add_argument("--port", "-p", type=int, help="The port number to listen on", required=False)
    # parser.add_argument("--verbose", "-v", help="Enable verbose output", required=False)
    
    # Parse the command-line arguments
    args = parser.parse_args()

    port = PORT
    if args.port:
        port = args.port

    print(f"Listening on port {port}")
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_socket.bind((HOST, port))
        server_socket.listen()
        while True:
            connection, addr = server_socket.accept()
            with connection:
                print(f"Connected by {addr}")
                handle_connection(connection)

if __name__ == "__main__":
    main()