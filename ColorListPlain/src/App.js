import ColorList from './ColorList'
import NewColorForm from './NewColorForm'
import {useState} from 'react'

const colorData = [
  {
    "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
    "title": "ocean at dusk",
    "color": "#00c4e2",
    "rating": 5
  },
  {
    "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
    "title": "lawn",
    "color": "#26ac56",
    "rating": 3
  },
  {
    "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
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



function App() {

  const [colors, setColors] = useState(colorData);

  const addNewColor = (title, color) => {
    
    // clone the array of current colors
    const newColors = [...colors]
    // add new color to the beginning of the list
    newColors.unshift({
      id: uuidv4(),
      rating: 0,
      title,
      color
    })
    console.log(newColors[0].id)
    setColors(newColors)
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
      <ColorList colors={colors} update={updateRating}/>
    </div>
  );
}

export default App;
