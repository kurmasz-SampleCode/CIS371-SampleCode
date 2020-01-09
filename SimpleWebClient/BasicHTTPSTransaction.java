import java.net.*;
import java.io.*;
import javax.net.ssl.*;

/**
 * Simple HTTPS Client
 * 
 * This program
 *    1. Creates a *secure* socket connected to an HTTPS web server 
 *    2. Makes a GET request 
 *    3. Prints the response headers to the standard output 
 *    4. Saves the data to a file beginning with `opts.`
 *
 * 
 * Created by kurmasz on 4/27/15.
 */

public class BasicHTTPSTransaction {
    public static void main(String[] args) throws Exception {

        System.setProperty("jsse.enableSNIExtension", "false");

        String host = "www.gvsu.edu";
        if (args.length > 0) {
            host = args[0];
        }

        SSLSocketFactory factory = (SSLSocketFactory) SSLSocketFactory.getDefault();

        SSLSocket socket = (SSLSocket) factory.createSocket(host, 443);

        socket.startHandshake();

        PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())));

        out.println("GET / HTTP/1.1\r");
        out.println("host: " + host + "\r");
        out.println("connection: close\r");
        out.println("\r");
        out.flush();

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        /*
         * Make sure there were no surprises
         */
        if (out.checkError())
            System.out.println("SSLSocketClient:  java.io.PrintWriter error");


        /* 
         * print the headers 
         */
        String line = in.readLine();
        while (line.length() > 0) {
          System.out.println(line);
          line = in.readLine();
        }

        /*
         * Send the data to a file
         */
        PrintWriter fileOutput = new PrintWriter(new FileOutputStream("opts.root.html"));
        
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            fileOutput.println(inputLine);
        }
        fileOutput.close();
        in.close();

        socket.close();
    }
}
