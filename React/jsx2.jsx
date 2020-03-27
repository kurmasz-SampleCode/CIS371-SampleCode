
let states = ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Georgia',
'Florida', 'Michigan', 'Minnesota', '...', '(you get the point :)'
];

const moreStates = <div>
  <p>Here are some more states:</p>
  <ul>
    {states.map((state) => <li>{state}</li>)}
  </ul>
</div>;


ReactDOM.render(moreStates, document.getElementById('main'));