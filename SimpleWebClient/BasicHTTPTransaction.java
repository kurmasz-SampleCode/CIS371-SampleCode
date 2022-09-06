import java.io.*;
import java.net.Socket;

/**
 * Simple HTTP Client
 * 
 * This program 1. Creates a socket connected to a web server 2. Makes a GET
 * request 3. Prints the response headers to the standard output 4. Saves the
 * data to a file named 'document'
 *
 * 
 * Created by kurmasz on 4/27/15.
 */
public class BasicHTTPTransaction {

  public static void main(String[] args) throws IOException {

    // Values set up for a web server running locally.
    // One option is to run "python -m SimpleHTTPServer" from the data directory
    String host = "localhost";
    int port = 8000;
    String file = "/index.html";
    String outputFile = "opt.index.html";

    Socket socket = new Socket(host, port);

    InputStream rawInput = socket.getInputStream();
    BufferedReader input = new BufferedReader(new InputStreamReader(rawInput));

    OutputStream rawOutput = socket.getOutputStream();
    PrintWriter output = new PrintWriter(rawOutput);

    output.printf("GET %s HTTP/1.1\n", file);
    output.printf("Host: %s\n", host);
    output.println("");
    output.flush();

    String line = input.readLine();
    while (line.length() > 0) {
      System.out.println(line);
      line = input.readLine();
    }

    PrintWriter fileOutput = new PrintWriter(new FileOutputStream(outputFile));
    line = input.readLine();
    while (line != null) {
      fileOutput.println(line);
      line = input.readLine();
    }
    fileOutput.close();
    socket.close();
  }
}
