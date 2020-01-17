import java.time.LocalDateTime;
import java.time.format.*;

public class Now {

    public static String getCurrentLocalDateTimeStamp() {
        return LocalDateTime.now()
           .format(DateTimeFormatter.ofPattern("EEEE, d MMMM yyyy 'at' hh:mm:ss a"));
    }

    public static void main(String[] args) {
        System.out.println("<html>");
        System.out.println("<body>");
        System.out.println("<h1>Cheap Clock</h1>");
        System.out.println("It is now " + getCurrentLocalDateTimeStamp() + ".");
        System.out.println("</body>");
        System.out.println("</html>");

    
    }
}