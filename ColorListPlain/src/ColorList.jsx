import React from "react";
import Color from "./Color";

export default function ColorList({ colors = [], loading = false, message, update = f => f }) {
  if (message) {
    return <div>{message}</div>
  }
  else if(!colors.length) {
    return <div>No Colors Listed.</div>;
  } else if (loading) {
    return <div>Loading ......</div>;
  } 
  return (
    <div>
      {
        colors.map(color => <Color key={color.id} {...color} onColorRatingUpdated={(newValue) => update(color.id, newValue)} />)
      }
    </div>
  );
}