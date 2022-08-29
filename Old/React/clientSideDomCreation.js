// Create an entire web page in JavaScript.
// (No, you would not want to write code this way.  
//  I'm just showing you what React does behind the scenes.)

// Create a container for all the dynamic content.
let div = document.createElement("div");

// Create a paragraph and fill it with text.
let p = document.createElement("p")
p.innerText = "Here is a list of some states"
    // add the paragraph to the div.
div.appendChild(p);

// Create a ul and add it to the div.
let ul = document.createElement("ul");

let states = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Georgia',
    'Florida', 'Michigan', 'Minnesota', '...', '(you get the point :)'
];

states.forEach((state) => {
    let li = document.createElement("li");
    li.innerText = state;
    ul.appendChild(li);
});

div.appendChild(ul);

// insert div into the web page.
let main = document.getElementById('main');
// Remove the placeholder text
main.innerText = '';
main.appendChild(div);