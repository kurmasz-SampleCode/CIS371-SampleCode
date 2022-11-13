import React from "react";
import Color from "./Color";

export default function ColorList({ colors = [], loading = false, message, onEditColor = f => f,  update = f => f }) {

  function editClicked(color) {
    console.log(color)
    return onEditColor(color)
  }


  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!colors.length) {
    return <div>No Colors Listed.</div>;
  } 
  return (
    <div>
      {
        colors.map(color => <Color key={color.id} {...color} onEditClicked={() => editClicked(color)} onColorRatingUpdated={(newValue) => update(color.id, newValue)} />)
      }
    </div>
  );
}