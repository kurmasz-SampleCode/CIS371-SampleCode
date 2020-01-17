import java.net.*;
import java.io.*;

/***********************************************************************************************
 * 
 * An HTTP that will execute programs in the cgi-bin directory to generate
 * dynamic content.
 * 
 ***********************************************************************************************/
public class DynamicServer1 {

    // This method demonstrates how to isolate a file's extension
    public static String getExtension(String filename) {
        int i = filename.lastIndexOf('.');
        if (i > -1) {
            return filename.substring(i + 1);
        } else {
            return null;
        }
    }

    /**
     * Run an external command and return the output as a single {@code String}
     * 
     * @param command the command to run (what you would type on the command line.)
     * 
     * @return the output of the command as a single {@code String}
     */
    public static String runExternalProcess(String command) {

        try {

            // Execute the command
            Runtime run = Runtime.getRuntime();
            Process proc = run.exec(command);

            // Obtain an InputStream from the Proc object
            BufferedReader input = new BufferedReader(new InputStreamReader(proc.getInputStream()));

            // Read all the lines and put them into the String buffer
            StringBuffer buffer = new StringBuffer();
            String line;
            while ((line = input.readLine()) != null) {
                buffer.append(line);
            }

            // Read anything that the process put on the standard err (stderr) and print it
            // to the screen.
            BufferedReader error = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            while ((line = error.readLine()) != null) {
                System.out.println("\tError: " + line);
            }

            input.close();
            error.close();
            System.out.println("Success!");
            return buffer.toString();
        } catch (IOException e) {
            System.out.println("Exception caught running external program: " + e);
            return null;
        }
    }

    public static void dynamicPage(PrintStream out, String filename) {

        System.out.println("Serving a dynamic web page: " + filename);
        String extension = getExtension(filename);

        String command;
        if (extension.equals("class")) {

            // Extract the class name from the filename
            int slashloc = filename.indexOf("/");
            int dotloc = filename.indexOf(".class");
            String className = filename.substring(slashloc + 1, dotloc);

            command = "java -cp cgi-bin " + className;
        } else if (extension.equals("pl")) {
            command = "perl " + filename;
        } else if (extension.equals("php")) {
            command = "php " + filename;
        } else if (extension.equals("rb")) {
            command = "ruby " + filename;
        } else {
            System.out.println("Dont' recognize extension =>" + extension + "<=");

            String toPrint = "<html><body>Problem running dynamic program: " + "Don't recognize extension =>" + filename
                    + "<= </body></html>";
            out.println("HTTP/1.1 500 ServerError");
            out.println("Content-Type: text/html");
            out.println("Content-Length: " + toPrint.length());
            out.println("Connection: close");
            out.println("");
            out.println(toPrint);
            return;
        }

        System.out.println("Launching external process =>" + command + "<=");

        String response = runExternalProcess(command);
        if (response == null) {
            String toPrint = "<html><body>Problem running dynamic program</body></html>";
            out.println("HTTP/1.1 500 ServerError");
            out.println("Content-Type: text/html");
            out.println("Content-Length: " + toPrint.length());
            out.println("Connection: close");
            out.println("");
            out.println(toPrint);
        } else {
            out.println("HTTP/1.1 200 OK");
            out.println("Content-Type: text/html");
            out.println("Content-Length: " + response.length());
            out.println("Connection: close");
            out.println("");
            out.println(response);
        }
    }

    /*
     * ProcessBuilder pb = new ProcessBuilder(command); Map<String, String> env =
     * pb.environment(); if (query != null) { env.put("QUERY_STRING", query); }
     * 
     * Process p = pb.start();
     * 
     * // Grab each line generated and place it in a List Scanner input = new
     * Scanner(p.getInputStream()); while (input.hasNext()) {
     * lines.append(input.nextLine()); lines.append('\n'); }
     * 
     * Scanner err = new Scanner(p.getErrorStream()); while (err.hasNext()) {
     * System.err.println(err.nextLine()); } } catch (IOException e) {
     * System.err.println("There was a problem: " + e);
     * e.printStackTrace(System.err); } return lines.toString(); } }
     */

    public static void send404(PrintStream out, String toPrint) {
        out.println("HTTP/1.1 404 Not Found");
        out.println("Content-Type: text/html");
        out.println("Content-Length: " + toPrint.length());
        out.println("Connection: close");
        out.println("");
        out.println(toPrint);
    }

    public static void main(String[] args) throws IOException {

        // Create a socket that listens on port 8534.
        int port = 8534;
        ServerSocket serverSocket = new ServerSocket(port);

        // Handle multiple requests sequentially
        while (true) {
            System.out.println("\n\nAwaiting new connection on port " + port);

            // Return a Socket object for the next connection in the queue
            Socket socket = serverSocket.accept();

            // Created a BufferedReader that can read from the socket
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            // Create a PrintStream than can write to the socket
            // Passing "true" as the second parameter causes each write to be followed by a
            // flush.
            PrintStream out = new PrintStream(socket.getOutputStream(), true);

            // Read the main command.
            String command = input.readLine();
            System.out.println("Command Received: =>" + command + "<=");

            // Read the request headers
            System.out.println("\nRequest Headers:");
            String headerLine = input.readLine();
            while (headerLine != null && !headerLine.isEmpty()) {
                System.out.println("\t" + headerLine);
                headerLine = input.readLine();
            }

            // split the command by spaces.
            String[] parts = command.split("\\s+");
            System.out.printf("Command; %s; path %s; protocol %s\n", parts[0], parts[1], parts[2]);

            String filename = parts[1];

            // If the path begins with "/", remove the "/".
            if (filename.startsWith("/")) {
                filename = filename.substring(1);
            }

            //
            // NEW CODE GOES HERE
            //

            // exit the server if the user requests "exit"
            if (filename.startsWith("cgi-bin/")) {
                dynamicPage(out, filename);
                socket.close();
                continue;
            }

            File f = new File(filename);

            // send 404 if file doesn't exist, or is not readable.
            if (!f.exists() || !f.canRead() || !f.isFile()) {
                System.out.println(filename + " not found.  Returning 404.");
                String toPrint = "<html><body>Problem finding/reading \"" + filename + "\"</body></html>";
                send404(out, toPrint);
                socket.close();
                continue;
            }

            FileInputStream fis;

            try {
                fis = new FileInputStream(f);
            } catch (Exception e) {
                String toPrint = "<html><body>Problem opening/reading \"" + filename + "\"</body></html>";
                send404(out, toPrint);
                socket.close();
                break;
            }

            // Respond
            out.println("HTTP/1.1 200 OK");
            out.println("Content-Type: text/html");
            out.println("Content-Length: " + f.length());
            out.println("Connection: close");
            out.println("");

            // read data from the file and send it to the client.
            byte[] buffer = new byte[8192];
            int read = fis.read(buffer);
            while (read != -1) {
                out.write(buffer, 0, read);
                read = fis.read(buffer);
            }
            fis.close();

            socket.close();

        } // end while(true)

        serverSocket.close();

        // When the connection ends, so does this program.
    }
}