// Sample code available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// Based on an example from Learning React, 2nd Edition by Porcello and Banks.
// This example is in React/exampleComponent1.jsx

/* Functional React component *without* JSX */
function IngredientsList1() {
  return React.createElement(
    "ul",
    { className: "ingredients" },
    React.createElement("li", null, "1 cup rolled oats"),
    React.createElement("li", null, "2 Tablespoons peanut butter"),
    React.createElement("li", null, "1/4 cup walnuts"),
    React.createElement("li", null, "1/4 cup dried cranberries"),
    React.createElement("li", null, "1 banana"),
  );
}

/* Functional React component *with* JSX */
function IngredientsList2() {
  return <ul className='ingredients'>
    <li>1 cup rolled oats</li>
    <li>2 Tablespoons peanut butter</li>
    <li>1/4 cup walnuts</li>
    <li>1/4 cup dried cranberries</li>
    <li>1 banana</li>
  </ul>;
}
