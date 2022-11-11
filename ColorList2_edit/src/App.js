/**********************************************************************
 * 
 * Variation of ColorList demo from Porcello and Banks book
 *
 **********************************************************************/

import ColorList from './ColorList'
import NewColorForm from './NewColorForm'
import { useState, useEffect } from 'react'
import ColorAPI from './ColorAPI'

const hardCodedColorData = [
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
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

function intToColor(value) {
  const longHexValue = `000000${value.toString(16)}`.slice(-6)
  return `#${longHexValue}`
}

const defaultColor = { id: null, title: "", color: "#000000" }

function App() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(defaultColor)

  let fetchColors = () => {
    setLoading(true)

    // fetchColors returns a promise (hence the ability to still
    // use then and catch below.)
    ColorAPI.fetchColors()
      .then(data => {
        // convert int to typical HTML hex string
        data.forEach((color) => color.color = intToColor(color.color))

        setMessage(undefined)
        setColors(data)
        setLoading(false)
      }).catch(problem => {
        setLoading(false)
        setMessage("Unable to load colors from the server.")
      });
  };

  // The [] below is important, otherwise, 
  // we end up making an API call on every update.
  useEffect(fetchColors, []);

  const updateRating = (id, newValue) => {
    const newColors = colors.map((color) => {
      return color.id === id ? { ...color, rating: newValue } : { ...color }
    })
    setColors(newColors)
  }

  const finishSubmit = (newColors) => {
    setColors(newColors)
    setEditMode(false)
    setColorToEdit(defaultColor);
  }

  const submit = (event) => {
    console.log(event)
    event.preventDefault();
    if (editMode) {
      console.log("In edit mode.") 
      ColorAPI.modifyColor(colorToEdit).then(data => {
        console.log("Received from modify color post")
        console.log(data)
        let newColors = colors.map( (item) => item.pk === colorToEdit.pk ? colorToEdit : item)
        finishSubmit(newColors)
      })   
    } else {
      console.log("In 'new color' mode.")
      colorToEdit.id = uuidv4()
      ColorAPI.addColor(colorToEdit).then( data => {
        console.log("Received from new color post")
        console.log(data)
        colorToEdit.pk = data.pk

        // Remember, use a completely new object
        // when updating state.
        let newColors = [colorToEdit, ...colors]
        finishSubmit(newColors)
      }).catch( data => {
        console.log("Problem saving new color")
        console.log(data);
        finishSubmit(colors)
      })
    }
  }

  // Called with the data in the form is updated
  // (Remember, the form is a "controlled" component.)
  const updateFormData = (color) => {
    setColorToEdit(color);
  }

  // Called when an "Edit" button is pushed
  const editColor = (color) => {
    setColorToEdit(color)
    setEditMode(true)
  }

  const cancelEdit = () => {
    setColorToEdit(defaultColor)
    setEditMode(false);
  }

  return (
    <div style={{ margin: 50 }}>
      <NewColorForm editMode={editMode} colorToEdit={colorToEdit} onUpdate={updateFormData} onSubmit={submit} onCancelEdit={cancelEdit} />
      <ColorList colors={colors} loading={loading} message={message} onEditColor={editColor} update={updateRating} />
    </div>
  );
}

export default App;
