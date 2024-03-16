import ColorList from './ColorList'
import NewColorForm from './NewColorForm'
import {useState, useEffect} from 'react'

const apiURL='http://localhost:3001'


const hardCodedColorData = [
  {
    "id": 1,
    "uuid": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
    "title": "ocean at dusk",
    "color": "#00c4e2",
    "rating": 5
  },
  {
    "id": 2,
    "uuid": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
    "title": "lawn",
    "color": "#26ac56",
    "rating": 3
  },
  {
    "id": 3,
    "uuid": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
    "title": "bright red",
    "color": "#ff0000",
    "rating": 0
  }
]

// copied from https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

function intToColor(value) {
  const longHexValue = `000000${value.toString(16)}`.slice(-6)
  return `#${longHexValue}`
}

function App() {

  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [reloadCount, setReload] = useState(0);

  let fetchColors = () => {
    //return;
    setLoading(true)

    // You can configure a delay on the API if you 
    // want to see what happens if the server is slow.
    fetch(`${apiURL}/colors?delay=3000`).then(response => {
      console.log("Look what I got: ");
      console.log(response);
      // Notice we aren't done yet.  
      // We still need to call response.json(), which returns a Promise
      // (hence the need for a second "then" block);
      return response.json();
    }).then(data => {
      console.log("And the JSON");
      console.log(data);
  
      data.forEach((color) => color.color = intToColor(color.color))   
      console.log("Color data after fixing up the hex values:")
      console.log(data)

      setMessage(undefined)
      setColors(data)
      setLoading(false)
    }).catch (problem => {
      setLoading(false)
      setMessage("Unable to load colors from the server.")
    });
  };

  // The [] below is important, otherwise, 
  // we end up making an API call on every update.
  useEffect(fetchColors, [reloadCount])

  const addNewColor = (title, color) => {
    
    // clone the array of current colors
    const newColors = [...colors]
    // add new color to the beginning of the list
    newColors.unshift({
      id: colors.length,
      uuid: uuidv4(),
      rating: 0,
      title,
      color
    })
    console.log(newColors[0].id)
    setColors(newColors)
  }

  const updateRatingBROKEN = (id, newValue) => {

    let indexOf = colors.findIndex((c) => c.id === id)
    console.log("Index of: " + indexOf)
    console.log(id)
    console.log(colors)
    colors[indexOf].rating = newValue
    setColors(colors)
  }

  const updateRating = (id, newValue) => {
    const newColors = colors.map( (color) => {
      return color.id === id ? {...color, rating: newValue} : {...color}
    })
    setColors(newColors)
  
  }


  return (
    <div style = {{margin: 50}}>
      <NewColorForm onNewColor={addNewColor}/>
      <button onClick={() => setReload(reloadCount + 1)}>Reload ({reloadCount})</button>
      <ColorList colors={colors} loading={loading} message={message} update={updateRating}/>
    </div>
  );
}

export default App;
