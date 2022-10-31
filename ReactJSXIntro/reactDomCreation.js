let states = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Georgia',
    'Florida', 'Michigan', 'Minnesota', '...', '(you get the point :)'
];

// When calling createElement, 
//   * the first parameter is the element type,
//   * the second parameter is a hash of properties (also called "props")
//   * the remaining parameters are child elements (in this case, text)
var items = states.map((item) => React.createElement("li", null, item));

let div = React.createElement("div",
    null,
    React.createElement("p", null, "Here is a list of some states (created using React)"),

    // Note the use of className instead of class ("class" is a keyword)
    // The ...items syntax takes the array of child elements and pulls them
    // out into a list of parameters.
    React.createElement("ul", { className: 'stateList' }, ...items)
);

//
// Insert the document into the html page
//
// This is the new way (under React 18 and after)
const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(div);

//ReactDOM.render(div, document.getElementById('main'));