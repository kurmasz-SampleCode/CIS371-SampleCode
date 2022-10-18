"use strict";
/*
 Prints the DOM tree to the console using the standard DOM API.
 Many languages (not just JavaScript) implement this API.
*/

// Some spaces for indentation purposes.
var spaces = "                                                                  ";


// IMPORTANT!  This code is written to demonstrate how the DOM is structured and what classes it uses.
// JavaScript provides easier ways to access data from the DOM.  Learn those
// techniques instead of naively copying this code!
function examineNode(node) {

    console.log("****************************************");
    console.log("Examining a node: ");
    console.log(node);
    printAttributes(node);
    
    let children = node.childNodes;
    console.log("The children:  ");
    console.log(children);

    // Notice that 
    //   * childNodes is a NodeList object (not an array)
    //     * But, NodeList does have a forEach method.
    //   * the body's first node is a text node containing the blank space between the 
    //     <body> tag and the <h1> tag.
    //   * Everything is a Node, not just Elements (i.e., the stuff with tags)
    //     #text is a kind of node.  So is #comment
    //   * nodeType is an int.  You have to look up the name of the type that goes with each int.
    //   * Look at the <ul> to see the difference between textContent and innerHTML
    children.forEach((child, i) => {
        console.log("------------------------------");
        console.log("child " + i + ":");
        console.log(child);
        console.log("Node Type: " +  child.nodeType + " (" + nodeTypeName(child.nodeType) + ")");
        console.log("Node name: '" + child.nodeName + "'");
        console.log("Node value: '" + cleanUp(child.nodeValue) + "'");
        console.log("Text content:  '" + cleanUp(child.textContent) + "'");
        console.log("innerHTML:  '" + child.innerHTML + "'");
    });
}

function printAttributes(node) {
    var attributes = node.attributes;
    console.log(attributes);
    for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        console.log(`${attribute.nodeName} ==> ${attribute.nodeValue}`);
    }
}


function nodeTypeName(typeNumber) {
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

function cleanUp(input) {

    if (input == null) {
        return "<null>";
    } else {
        return input.replace(/\n/g, "<cr>");
    }
}



function printElement(element, depth) {

    var indentSize = 3;
    var indent = spaces.slice(0, depth * indentSize);
    var indent2 = spaces.slice(0, (depth + 1) * (indentSize));

    // Print the tag
    console.log(indent + "<" + element.nodeName + ">");

    // print the attributes
    for (var i = 0; i < element.attributes.length; i++) {
        var item = element.attributes.item(i);
        console.log(indent2 + "* " + item.nodeName + ": " + item.nodeValue);
    }

    // print the children
    element.childNodes.forEach((item) => {
        // recursively handle other tags
        if (item.nodeType == Node.ELEMENT_NODE) {
            printElement(item, depth + 1);
        } else if (item.nodeType == Node.TEXT_NODE) {
            var value = item.nodeValue.replace(/\n/g, "\\n");
            console.log(indent2 + "->" + value + "<-");
        } else if (item.nodeType == Node.COMMENT_NODE) {
            console.log(indent2 + `Comment: ${item}`)
        } else {
            console.log(`Oops!  Unrecognized node type ${item.nodeType}`);
        }
    });
} // end printElement

//printElement(document.documentElement, 0);
