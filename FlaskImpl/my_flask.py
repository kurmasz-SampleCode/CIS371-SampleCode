"""
my_flask.py

  This is a "pretend" implementation of Flask. The idea is to show one 
  way Flask _might_ be implemented so that the framework doesn't feel like "magic".

  GVSU CIS 371 W25
"""

import io
import re
import socket
import http_socket

HOST = "127.0.0.1"   # Standard loopback interface address (localhost)
DEFAULT_PORT = 5050  # Port to listen on (non-privileged ports are > 1023)

# "global" variable holding the request data.
# This is a bad idea. Flask doesn't actually use a global variable,
# instead it uses a context-local object managed by Werkzeug's LocalProxy.
request = None


class Request:
    """
    Just a container for information related to a request
    """
    pass


class MyFlask:

    def __init__(self):
        self.routes = {"GET": {}, "POST": {}, "PUT": {}, 'DELETE': {}}

    def add_route(self, path, callback, method='GET'):
        """ 
        Add a route to the route map.

        In other words, map the name/pattern of the route to a 
        python function to call when that route is requested.
        """
        self.routes[method][path] = callback

    def run(self, port=DEFAULT_PORT):
        """
          Open a server socket, listen, and wait for connections.
        """
        print(f"Listening on port {port}")
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
            server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            server_socket.bind((HOST, port))
            server_socket.listen()
            while True:
                connection, addr = server_socket.accept()
                with connection:
                    print(f"Connected by {addr}")
                    self.handle_connection(connection)

    def handle_connection(self, connection):
        """
        Handle the "conversation" with a single client connection
        """
        socket = http_socket.HTTPSocket(connection)

        # reset the request object.
        global request
        request = Request()

        # Read and print the request (e.g. "GET / HTTP/1.0")
        request_str = socket.receive_text_line()
        print(f"Request: {request_str}")

        # Read and print the request headers
        print("Headers:")
        request.headers = {}
        while True:
            data = socket.receive_text_line().strip()
            if (not data) or (len(data) == 0):
                break
            print(f"   {data}")
            key, value = data.split(':', 1)
            request.headers[key] = value
        print('----------------------')

        # Extract the path from the request.
        parts = request_str.split()
        verb = parts[0].upper()
        path, _, query_string = parts[1].partition('?')
        request.args = {}

        # Parse the query string
        if query_string:
            key_value_pairs = query_string.split('&')
            for kv_pair in key_value_pairs:
                key, value = kv_pair.split('=', 1)
                request.args[key] = value

        # Read and print the request body, if present
        content_length = int(request.headers.get('Content-Length', 0))
        if content_length > 0:
            print("Request Body")

            # Because the client is likely using HTTP/1.1 and Connection: keep-alive
            # We need to read the exact number of bytes so that we don't cause the
            # socket read to block
            byte_stream = io.BytesIO()
            socket.transfer_incoming_binary_data(byte_stream, content_length)
            request_body = byte_stream.getvalue().decode()
            print(request_body)
        print("====================")

        #
        # Find the callback for the given route
        #
        
        # If we aren't using patterns, we can do this:
        # callback = self.routes.get(verb, {}).get(path, None)
        
        # If we are using patterns, it looks more like this:
        callback = None
        match = None
        for regex, route in self.routes.get(verb, {}).items():
           match = re.fullmatch(regex, path)
           if match:
               callback = route
               break

        if callback:
            print(f"The matches:  {match.groups()}")
            content = callback(*match.groups())
            socket.send_text_line("HTTP/1.0 200 OK")
            socket.send_text_line(f"Content-Type: text/html")
            socket.send_text_line(f"Content-Length: {len(content) + 2}")
            socket.send_text_line(f"Connection: close")
            socket.send_text_line("")
            socket.send_text_line(content)
        else:
            message = f"No route named '{path}' for {verb}."

            socket.send_text_line("HTTP/1.0 404 NOT FOUND")
            socket.send_text_line("Content-Type: text/plain")
            socket.send_text_line(
                f"Content-Length: {len(message) + 2}")  # +2 for CR/LF
            socket.send_text_line(f"Connection: close")
            socket.send_text_line("")
            socket.send_text_line(message)

        socket.close()

    def route(self, route, method='GET'):
        """ 
        This defines the route decorator.  
        In python a decorator is simply a wrapper around a function
        """
        def wrapper(func):
            self.add_route(route, func, method)
            return func
        return wrapper
