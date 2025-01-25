"""
http_socket.py

This class opens a socket, then provides a means to perform both text and binary operations.
In particular, it supports reading the text responses and headers from an HTTP server, followed
by reading a binary payload. (In general, one must be careful when switching between text and 
binary operations to ensure that any buffered data are not lost.)

The main goal for this code is simplicity. It is, by no means, the most efficient implementation.

GVSU CIS 371 2025
"""

import socket
import ssl
import sys

BLOCK_SIZE = 1024
CR_LF = b'\r\n'

class HTTPSocket: 

    def __init__(self, skt,  verbose=False):
        self.socket = skt
        self.leftover = b''
        self.verbose = verbose 

    @classmethod
    def connect(cls, hostname, port, secure=True, verbose=False):
        """
        Open a socket connection to the specified host and port.
        * secure: Use SSL
        * verbose: display send and received messages on stderr. 
        """ 
        raw_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)        
        
        if secure:
            context = ssl.create_default_context()  # Create a default SSL context
            skt = context.wrap_socket(raw_socket, server_hostname=hostname)
        else:
            skt = raw_socket
        skt.connect((hostname, port))
        return cls(skt, verbose=verbose)

    def receive_text_line(self):
        """
        Receive one line of text from the sender.

        Conceptually, this method pulls one byte at a time from the socket until it 
        encounters a newline, then returns the line of text.

        However, reading one byte at a time would be very inefficient. So, instead, 
        this method reads a chunk of BLOCK_SIZE bytes. If the line of text is shorter than 
        BLOCK_SIZE, it saves the leftovers and uses those bytes before reading more bytes 
        from the socket. 
        """

        # Check and see if the leftover bytes contain a full line of text.
        # if not, read more bytes and combine them with the leftovers 
        # (if any)
        if CR_LF in self.leftover:
            chunk = self.leftover
        else:
            chunk = self.leftover + self.socket.recv(BLOCK_SIZE)

        # Split the bytes at the first CR/LF combination.
        # The first part is decoded and returned as text.
        # The second part is the "leftover" bytes and is 
        # saved for the read operation
        line, self.leftover = chunk.split(CR_LF, 1)
        return line.decode()

    def send_text_line(self, message):
        """
        Send one line of text followed by CR_LF
        """
        if (self.verbose):
            sys.stderr.write(f"Sending =>{message}<=\n")
            sys.stderr.flush()
        self.socket.sendall(message.encode('utf-8') + CR_LF)


    def transfer_incoming_binary_data(self, target, content_length):
        """
        Transfer content_length bytes from the socket to the target stream.
        (Or simply transfer any remaining bytes if the socket closes before
        reaching content_length)
        """

        # If we have enough leftover bytes, simply use them.
        if content_length < len(self.leftover):
            data = self.leftover[:content_length]
            self.leftover = self.leftover[content_length:]
            target.write(data)
        else: 
            # Begin by writing any leftover bytes.
            target.write(self.leftover)
            bytes_received = len(self.leftover)

            # receive and write chunks of BLOCK_SIZE bytes until content_length
            # bytes have been received.
            while bytes_received < content_length:  
                chunk = self.socket.recv(min(content_length - bytes_received, BLOCK_SIZE))
                target.write(chunk)
                bytes_received += len(chunk)

    def send_binary_data_from_file(self, source, content_length):
        """
        Send content_length bytes from the source file.
        """
        bytes_sent = 0
        while bytes_sent < content_length:
            chunk = source.read(min(content_length, BLOCK_SIZE))
            self.socket.sendall(chunk)
            bytes_sent += len(chunk) 

    def close(self):
        self.socket.close()


    def __del__(self):
        self.close()