"""
This script provides a minimum working example of an HTTP request.
For simplicity, 
    (1) the URL (and it's components) are hard-coded, and
    (2) the script is not organized into functions.

See simple_web_client.py for a more complete example.

GVSU CIS 371
"""

import socket
import sys

hostname = 'example.com'
path = '/'
port = 80

# Connect to the server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((hostname, port))
stream = s.makefile('rw')

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

# Read content 
content = stream.readlines()

# Write the response and headers to stderr
sys.stderr.write(f"\nResponse: {response.strip()}\n")
sys.stderr.write("Headers:\n")
for key, value in headers.items():
    key_colon = f"{key}:"
    sys.stderr.write(f"   {key_colon:15} {value}\n")

print("".join(content))