"""
dynamic_content_server.py

This is a very simple HTTP server that serves dynamic content.

GVSU CIS 371 2025
"""

import os
import io
import socket
import http_socket
import fetch_temp_data
import argparse
import datetime
import re

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 8081  # Port to listen on (non-privileged ports are > 1023)

##############################################################
#
# New function for sending dynamically-generated HTML
#
################################################################
def send_html(socket, content_lines):
    """ 
    Send the given content as HTML
    """
    html_lines = []
    html_lines.append('<html>')
    html_lines.append('<body>')
    html_lines += content_lines
    html_lines.append('</body>')
    html_lines.append('</html>')

    body = "\n".join(html_lines)

    socket.send_text_line("HTTP/1.0 200 OK")
    socket.send_text_line(f"Content-Type: text/html")
    socket.send_text_line(f"Content-Length: {len(body)+2}")
    socket.send_text_line(f"Connection: close")
    socket.send_text_line("")
    socket.send_text_line(body)


def handle_connection(connection):
    """
    Handle the "conversation" with a single client connection
    """
    socket = http_socket.HTTPSocket(connection)

    # Read and print the request (e.g. "GET / HTTP/1.0")
    request = socket.receive_text_line()
    print(f"Request: {request}")

    # Read and print the request headers
    print("Headers:")
    headers = {}
    while True:
        data = socket.receive_text_line().strip()
        if (not data) or (len(data) == 0):
            break
        print(f"   {data}")
        key, value = data.split(':', 1)
        headers[key] = value
    print('----------------------')

    # Extract the path from the request.
    parts = request.split()
    path = parts[1][1:]  # remove the first character of the path

    ##############################################################
    #
    # New Code for this demo
    #
    ################################################################

    # Read and print the request body, if present
    content_length = int(headers.get('Content-Length', 0))
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
    # Current date and time at the server
    #
    if path == 'timedate' or path == 'datetime':
        now = datetime.datetime.now()
        formatted_date = now.strftime("%A %d %B %Y")
        formatted_time = now.strftime("%I:%M:%S %p")

        html_lines = []
        html_lines.append('<h1>Time and Date</h1>')
        html_lines.append(f"Where the server is located, it is {formatted_time} on {formatted_date}")
        send_html(socket, html_lines)
        return

    #
    # Current temperature in Allendale, MI
    #
    if path == 'current_allendale_temperature':
        temperature = fetch_temp_data.temp_for_location('42.9675','-85.9509')
        
        html_lines = []
        html_lines.append('<h1>Current Temperature</h1>')
        html_lines.append(f"Currently, it is {temperature}&deg;F in Allendale, MI.")
        send_html(socket, html_lines)
        return

    #
    # Current temperature in city specified by zip code in query string
    #
    if path.startswith('current_temperature_query?'):
        _, query_string = path.split('?', 1)
        key_value_pairs = query_string.split('&')

        parameters = {}
        for kv_pair in key_value_pairs:
            key, value = kv_pair.split('=', 1)
            parameters[key] = value
        
        html_lines = []
        html_lines.append('<h1>Current Temperature</h1>')

        if not 'zip' in parameters:
            html_lines.append('Unable to display temperature: No zip provided')
        else:
            place=fetch_temp_data.info_for_zip(parameters['zip'])
            temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
            html_lines.append(f"Currently, it is {temperature}&deg;F in {place['place name']}, {place['state abbreviation']}")

      
        html_lines.append('<hr>')
        html_lines.append('<h1>Query Parameters</h1>')
        html_lines.append('<ul>')
        for key, value in parameters.items():
            html_lines.append(f"<li>{key}: {value}")
        html_lines.append('</ul>')

        send_html(socket, html_lines)
        return

    #
    # Current temperature in city specified by zip code in the path
    # (Notice that the server will crash if the 2nd part of the path isn't a zip code )
    #
    if path.startswith('current_temperature_route/'):
        _, zip_code = path.split('/', 1)
        place=fetch_temp_data.info_for_zip(zip_code)
        temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
            
        html_lines = []
        html_lines.append('<h1>Current Temperature</h1>')
        html_lines.append(f"Currently, it is {temperature}&deg;F in {place['place name']}, {place['state abbreviation']}.")

        send_html(socket, html_lines)
        return

    #
    # A better approach is to use a regular expression to match
    # the pattern more specifically. Patterns that don't match 
    # are just passed on to other checks
    #
    match = re.fullmatch(r'current_temperature/(\d{5})', path)
    if match:
        zip_code = match[1]
        place=fetch_temp_data.info_for_zip(zip_code)
        temperature = fetch_temp_data.temp_for_location(place['latitude'], place['longitude'])
            
        html_lines = []
        html_lines.append('<h1>Current Temperature</h1>')
        html_lines.append(f"Currently, it is {temperature}&deg;F in {place['place name']}, {place['state abbreviation']}.")

        send_html(socket, html_lines)
        return

    #
    # Simply show the request body.
    # (Fully handling the POST would add complexity I'd like to avoid for this example.)
    #
    if path == 'current_temperature_post':
        html_lines = []
        html_lines.append('<h1>Post Request</h1>')
        html_lines.append(f"<p>A request was made with the following parameters: <code>{request_body}</code></p>")
        html_lines.append(f"<p>(For simplicity, this browser doesn't handle POST requests.)</p>")
        send_html(socket, html_lines)

    #
    # Root route
    #
    if path == '':
        path = 'all_routes.html'

    #
    # End of new code
    #

    # Assume the path is a file name.
    # If the file name exists, we will send it as a response.
    # Otherwise, send a 404.
    if os.path.exists(path):

        type = 'text/html' if path.endswith('.html') else 'text/plain'

        # We need to know the file size so we can send
        # the Content-Length header.
        file_size = os.path.getsize(path)
        with open(path, 'r') as file:
            socket.send_text_line("HTTP/1.0 200 OK")
            socket.send_text_line(f"Content-Type: {type}")
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
        socket.send_text_line(
            f"Content-Length: {len(message) + 2}")  # +2 for CR/LF
        socket.send_text_line(f"Connection: close")
        socket.send_text_line("")
        socket.send_text_line(message)

    socket.close()


def main():
    """
    Parse arguments and set up the server socket
    """

    # Set up the argument parser
    parser = argparse.ArgumentParser(
        description="A simple plain text HTTP server")
    parser.add_argument("--port", "-p", type=int,
                        help="The port number to listen on", required=False)
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
