"""
simple_web_client.py

This script mimics the fundamental behavior of curl (https://curl.se/).
It: 
  * takes a URL as a parameter, 
  * makes a GET request to that URL, and 
  * writes the resulting output to the standard output.

IMPORTANT: For simplicity, this script can only handle text documents.  

See hard_coded_https_request.py for a simpler example.  

GVSU CIS 371
"""

import argparse
import socket
import ssl
import re
import sys

def parse_url(url):
    """
    Split a url into protocol, hostname, port, and path.
    * The protocol is always returned in lower case
    * The port (if present) is converted to an integer.
    * An empty path is returned as '/'

    IMPORTANT: For simplicity, the regular expression below is designed only
      to correctly separate a URL into components. It _does not_ validate the
      components. For example, this regular expression will happy split a URL, 
      even if the hostname contains invalid symbols, consecutive dots, and 
      other invalid patterns.

      Also, to keep the code simple, this function does not support URLs with
      query strings.
    """

    # Raise an exception if the URL contains a query string.
    if '?' in url:
        raise ValueError(f"Query string not supported. {url}")

    # To make the code easier to follow, we will construct the URL-parsing regular expression in parts.
    protocol_re = r'(\w+)'      # One or more of any letter, number, or underscore.
    hostname_re = r'([^/:]+)'   # One or more of anything except a slash or colon. (See note above)
    port_re = r'(?::(\d+))?'    # An optional sequence of one or more integers.
                                # (The ?: at the beginning makes the outer group "non-capturing") 
    path_re = r'(?:/([^?]*))?'  # An optional slash followed by zero or more characters

    m = re.search(f"^{protocol_re}://{hostname_re}{port_re}{path_re}$", url)

    # You could also build the regular expression all at once; but, it is harder
    # to understand.
    # m = re.search(r'^(\w+)://([^/:]+)(?::(\d+))?(?:/([^?]*))?$', url)

    # Raise an error if URL does not follow the correct pattern
    if not m:
        raise ValueError(f"Invalid URL: {url}")
    
    # Grab the values from each capture group.
    protocol = m[1].lower()   # Return protocol in lower case
    hostname = m[2]

    # Convert the port to an integer, if present. Otherwise, 
    # leave it as "None"
    port = None if m[3] == None else int(m[3])
    
    # Replace an empty path with '/'
    path = m[4]
    if path == None or len(path) == 0:
        path = '/'

    return (protocol, hostname, port, path)


def open_raw(hostname, port):
    """
    Open a plain, raw, unencrypted socket
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((hostname, port))
    return s

def open_secure(hostname, port):
    """
    Open a socket and wrap with SSL
    """
    raw_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    context = ssl.create_default_context()  # Create a default SSL context
    ssl_socket = context.wrap_socket(raw_socket, server_hostname=hostname)
    ssl_socket.connect((hostname, port))
    return ssl_socket

def fetch(url):
    """
    Fetch web content 
    """
    
    # Split URL into components
    protocol, hostname, port, path = parse_url(url)

    # Assign default port numbers (if not otherwise specified by url)
    # then open a socket
    if protocol == 'http':
        port = 80 if port == None else port
        socket = open_raw(hostname, port)
    elif protocol == 'https':
        port = 443 if port == None else port
        socket = open_secure(hostname, port)
    else:
        # This version only supports http and https
        raise ValueError(f"Protocol must be http or https: {url}")

    stream = socket.makefile('rw')

    # Send the request
    stream.write(f"GET {path} HTTP/1.1\r\n")
    stream.write(f"Host: {hostname}\r\n")
    stream.write("User-Agent: GVBrowser/1.0\r\n")
    stream.write("Connection: close\r\n")
    stream.write("\r\n")
    stream.flush()   # Flush the buffer so the entire message is sent

    # read the response
    response = next(stream)

    # Collect headers
    headers = {}
    for line in stream:
        stripped_line = line.strip()
        if len(stripped_line) == 0:
            break
        key, value = stripped_line.split(":", 1)
        headers[key] = value

    content = stream.readlines()
    return (response, headers, content)

def main():
    # Set up the argument parser
    parser = argparse.ArgumentParser(description="Fetch data using HTTP or HTTPS")
    parser.add_argument("url", help="The URL to fetch")
    parser.add_argument("--output", "-o", help="Optional output file to save results.", required=False)
    
    # Parse the command-line arguments
    args = parser.parse_args()
    
    # Process the URL and optional output
    sys.stderr.write(f"Fetching {args.url}\n")
    if args.output:
        sys.stderr.write(f"Data will be written to: {args.output}")
        output = open(args.output, "w")
    else:
        sys.stderr.write("Data will be written to stdout.\n")
        output = sys.stdout

    response, headers, content = fetch(args.url)

    sys.stderr.write(f"\nResponse: {response.strip()}\n")
    sys.stderr.write("Headers:\n")
    for key, value in headers.items():
        key_colon = f"{key}:"
        sys.stderr.write(f"   {key_colon:15} {value}\n")
    
    output.write("".join(content))
    output.close()

if __name__ == "__main__":
    main()


