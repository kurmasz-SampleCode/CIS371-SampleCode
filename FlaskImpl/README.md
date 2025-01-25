This folder contains several Python implementations of a very simple HTTP client.

1. [hard_coded_http_request.py](./hard_coded_http_request.py) makes an unencrypted HTTP 
   request to an address that is hard-coded into the program. The goal of this code is
   to be as simple and straightforward as reasonable. 

2. [hard_coded_image_request.py](./hard_coded_image_request.py) makes an encrypted HTTPS
   request for an image (i.e, binary file) at an address that is hard-coded into the program.
   The goal of this code is to be as simple and straightforward as reasonable. 
   **IMPORTANT**: he code reads raw binary data from the socket after
   having also used a text IO wrapper (i.e., makefile()) ** In general this doesn't work!**
   See [simple_web_client.py](./simple_web_client.py) for the correct way to manage a socket
   with both text and binary data.

3. [simple_web_client.py](./simple_web_client.py) is a more complete web client. It can retrieve
   the content of any simple HTTP/HTTPS GET request (text or binary) accessible using a URL alone. 
   (It supports neither authentication not query strings.) It mimics the behavior of running
   `curl some_url -o output_file`

4. [http_socket.py](./http_socket.py) wraps the socket and handles the reading of both text and 
   binary data. The purpose of this file is to make [simple_web_client.py](./simple_web_client.py) 
   more readable by abstracting the details of reading binary data from a socket out of the main flow
   of the code.

