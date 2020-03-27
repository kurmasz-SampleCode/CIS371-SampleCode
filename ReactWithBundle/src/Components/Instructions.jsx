import React from "react";

export default function Instructions({ steps }) {
  return (
      <div className='instructions'>
          <h3>Instructions</h3>
          {steps.map((step, index) => (<p key={index}>{step}</p>))}
      </div>
  );
}