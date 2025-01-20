"""
This script provides a minimum working example of an 
HTTPS request that retrieves binary data. (An image 
in this case).
For simplicity, 
    (1) the URL (and it's components) are hard-coded, and
    (2) the script is not organized into functions.

See simple_web_client.py for a more complete example.

GVSU CIS 371
"""

import socket
import sys
import ssl

hostname = 'kurmasgvsu.github.io'
image_name = 'buzz1.jpg'
path = f'Images/{image_name}'
port = 443

# Connect to the SSL server
raw_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
context = ssl.create_default_context()  # Create a default SSL context
ssl_socket = context.wrap_socket(raw_socket, server_hostname=hostname)
ssl_socket.connect((hostname, port))

# The stream is for the text communication only.
# Don't use it for binary content
stream = ssl_socket.makefile("rw")

# Send the request
stream.write(f"GET {path} HTTP/1.1\r\n")
stream.write(f"Host: {hostname}\r\n")
stream.write("User-Agent: GVBrowser/1.0\r\n")
stream.write("Connection: close\r\n")
stream.write("\r\n")
stream.flush()   # Flush the buffer so the entire message is sent

# Read the response
response = next(stream)

# Collect headers
headers = {}
for line in stream:
    stripped_line = line.strip()
    if len(stripped_line) == 0:
        break
    key, value = stripped_line.split(":", 1)
    headers[key] = value

# Write the response and headers to stderr
sys.stderr.write(f"\nResponse: {response.strip()}\n")
sys.stderr.write("Headers:\n")
for key, value in headers.items():
    key_colon = f"{key}:"
    sys.stderr.write(f"   {key_colon:15} {value}\n")


# Send the request body (the binary data containing the image)
# to a file.
# IMPORTANT: Notice that this block switches from using the 
# stream (which is text based) to using the socket (which 
# is byte based). Because of buffering, switching between 
# streams and bytes can be error-prone and is not recommended).
with open(image_name, "wb") as file:
    while True:
        # Read raw bytes from the socket
        chunk = ssl_socket.recv(4096)  # 4 KB buffer size
        if not chunk:  # No more data, connection closed
            break
        # Write the chunk directly to the file
        file.write(chunk)