import java.net.*;
import java.io.*;
import javax.net.ssl.*;

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

        /*
         * Make sure there were no surprises
         */
        if (out.checkError())
            System.out.println("SSLSocketClient:  java.io.PrintWriter error");

        /* read response */
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            System.out.println(inputLine);
        }

        socket.close();
    }
}
