
let states = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Georgia',
'Florida', 'Michigan', 'Minnesota', '...', '(you get the point :)'
];

const moreStates = <div>
  <p>Here are some more states:</p>
  <ul>
    {states.map((state) => <li>{state}</li>)}
  </ul>
</div>;

// This is the new React18 way of rendering the content
const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(moreStates);

// This is the old way.
// ReactDOM.render(moreStates, document.getElementById('main'));