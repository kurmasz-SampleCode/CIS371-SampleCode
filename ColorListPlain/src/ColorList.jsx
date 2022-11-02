import React from "react";
import Color from "./Color";

export default function ColorList({ colors = [], update = f => f }) {
  if(!colors.length) return <div>No Colors Listed.</div>;
  return (
    <div>
      {
        colors.map(color => <Color key={color.id} {...color} onColorRatingUpdated={(newValue) => update(color.id, newValue)} />)
      }
    </div>
  );
}