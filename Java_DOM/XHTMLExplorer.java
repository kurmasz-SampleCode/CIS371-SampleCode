import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


/**
 * Created by kurmasz on 12/19/14.
 */
public class XHTMLExplorer {

  public static String SPACES = "                                                                            ";


  public static void main(String[] args) throws Exception {

    //String fileName = "data/example1.html";
    String fileName = "Java_DOM/lotsOfLinksWithScript.html";
    if (args.length > 0) {
      fileName = args[0];
    }

    // Create a DOM tree (a tree of objects) describing an xhtml document.
    DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
    domFactory.setValidating(true);

    DocumentBuilder domBuilder = domFactory.newDocumentBuilder();
    Document document = domBuilder.parse(fileName);

    // First, let's take a close look at the <body> tag. 
    // getElementsByTagName recursively retrieves all Element objects with a given name.
    // In this case, we know there is only 1.
    //
    // Notice that, even though all the objects being sought will be Elements, the method's return type is
    // NodeList.  Yes, this is annoying; but, it's only an issue because Java is statically typed.  The return type
    // is not an issue in JavaScript or other dynamically typed languages.
    //
    // As you examine the output of this method, note:
    // (1) The first child is a text node containing only newlines.  These are the two newlines between the 
    //     closing </body> tag and the opening <h1> tag.
    // (2) Text nodes have "#text" for their name.
    // (3) An Element nodes name is it's tag name (e.g., "h1").
    // (4) An Element node has no value.  Important:  The value is *not* its text!

    NodeList nl = document.getElementsByTagName("body");
    examineNode(nl.item(0));

    // Now, let's look more closely at the link (the anchor tag)
    //
    // Notice that the Document provides a method to search by id: getElementById
    // * An id is just one of many possible attributes; but, it gets special treatment in the DOM.
    // * Because ids must be unique in a document, the return type is a single object, not a list
    // * Because attributes apply to Elements only, the return type is an Element instead of Node.
    //
    // Important!  In Java, the getElementById method only works if the document is validated.
    //
    // Although the "class" attribute is also important to HTML, there is no direct support for it
    // in Java's DOM.
    Element anchor = document.getElementById("theLink");
    examineNode(anchor);

    // Traverse the tree and print the contents of the dom.
    //System.out.println("\n---------------------");
   // printAllElements(document.getDocumentElement(), 0);
  }


  public static void examineNode(Node node) {

    System.out.println("\nExamining a <" + node.getNodeName() + "> node:");

    // First, print the attributes
    printAttributes(node);


    // Let's take a look at all the children of this Node:
    //
    // The getChildNodes method's return type is NodeList.  In this case, this return type makes sense because
    // the body tag has several different types of nodes (Elements, Text, Comments, and Attributes).
    //
    // Notice also that the NodeList class is part of the DOM.  It is *not* a Java ArrayList.  
    // This means that you can't use a "foreach" loop, or other Array methods.  
    // This minor annoyance is not limited to Java.

    NodeList children = node.getChildNodes();
    for (int i = 0; i < children.getLength(); i++) {

      // Notice the use of "getLength" above and "item" below      
      Node theChild = children.item(i);

      System.out.printf("Child %d:\n", i);
      System.out.printf("\tNode Type: %d (%s)\n", theChild.getNodeType(), nodeTypeName(theChild.getNodeType()));

      // Every Node has a name and a value; but, the meaning of that name and value depends on the specific type of node.
      // See https://docs.oracle.com/javase/7/docs/api/org/w3c/dom/Node.html for details)
      System.out.printf("\tNode name: '%s'\n", theChild.getNodeName());
      System.out.printf("\tNode value: '%s'\n", cleanUp(theChild.getNodeValue()));
    }
  }

  /**
   * Print a Node's attributes
   *
   * @param node
   */
  private static void printAttributes(Node node) {
    NamedNodeMap attributes = node.getAttributes();

    if (attributes.getLength() == 0) {
      System.out.println("<no attributes>");
      return;
    }

    for (int i = 0; i < attributes.getLength(); i++) {
      Node attribute = attributes.item(i);

      // Technique 1:  Just call the Node interface's getNodeName and getNodeValue methods.
      System.out.printf("%s -- %s\n", attribute.getNodeName(), attribute.getNodeValue());

      // Technique 2:  Cast the Node to at Attr object and call getName and getValue
      // Attr attr = (Attr) attribute;
      //System.out.printf("%s -- %s\n", attr.getName(), attr.getValue());
    }
  }

  /**
   * Map the Node type number to a meaningful string.
   *
   * @param typeNumber
   * @return
   */
  public static String nodeTypeName(short typeNumber) {
    switch (typeNumber) {
      case Node.ATTRIBUTE_NODE:
        return "Attribute";
      case Node.TEXT_NODE:
        return "Text";
      case Node.ELEMENT_NODE:
        return "Element";
      case Node.COMMENT_NODE:
        return "Comment";
      default:
        return "<unknown>";
    }
  }

  /**
   * Replace newlines and nulls with something more easier to read.    *
   *
   * @param input
   * @return
   */
  public static String cleanUp(String input) {

    if (input == null) {
      return "null";
    } else {
      return input.replace("\n", "<cr>");
    }

  }


  /**
   * recursively print the contents of an xhtml tag (i.e., "element")
   */
  public static void printAllElements(Element e, int depth) {

    // Grab enough spaces for the proper level of indention
    String spaces = SPACES.substring(0, depth * 3);

    System.out.printf("%s<%s>\n", spaces, e.getNodeName());


    // print each attribute.  Notice that the getAttributes() method returns a map of Node type, not Attr type.
    NamedNodeMap attributes = e.getAttributes();
    for (int j = 0; j < attributes.getLength(); j++) {
      Node attribute = attributes.item(j);

      System.out.printf("%s   * %s: %s\n", spaces, attribute.getNodeName(), attribute.getNodeValue());
    }

    // Print each Child node.
    // The child nodes can be of two types:  Text for text between tags, or Element for nested tags
    NodeList nodes = e.getChildNodes();
    for (int j = 0; j < nodes.getLength(); j++) {
      Node node = nodes.item(j);

      if (node.getNodeType() == Node.ELEMENT_NODE) {
        // recursively print nested tags.
        printAllElements((Element) node, depth + 1);

      } else if (node.getNodeType() == Node.TEXT_NODE) {
        // Print any text between tags
        // (I replaced actual newlines with "\n" so they appear on the screen)
        String text = node.getTextContent().replace("\n", "\\n");
        System.out.printf("%s   \"%s\"\n", spaces, text);

      } else {
        // Oops, I must have forgot a case.
        System.out.println("Node " + node + " is not an element or text");
      }
    }
  }


}
