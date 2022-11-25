import React from "react"


export default function AddColorForm({ editMode = false, colorToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f }) {

  // See the "Creating Custom Hooks" section in Porcello and Banks
  // for a short-cut to the cut-and-paste for value and onChange.
  return (
    <div id='updateForm'>
      {editMode ? "Update" : "New"} Color
      <form onSubmit={onSubmit}>
        <input
          value={colorToEdit.title}

          // Copy the current colorToEdit, then provide updated title
          onChange={event => onUpdate({ ...colorToEdit, title: event.target.value })}
          type="text"
          placeholder="color title..."
          title='Title'
          required
        />
        <input
          value={colorToEdit.color}
          onChange={event => onUpdate({ ...colorToEdit, color: event.target.value })}
          type="color"
          title='Color'
          required
        />
        <button>{editMode ? "Update" : "Add"}</button>

        {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
        <button type='button' onClick={onCancelEdit}>Cancel</button>
      </form>
    </div>
  )
}