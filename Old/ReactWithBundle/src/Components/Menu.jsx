import React from "react"
import Recipe from "./Recipe.jsx"

export default function Menu({ title, recipes }) {
  const [currentIndex, setIndex] = React.useState(0);
  const recipe = recipes[currentIndex];
  return (
      <section>
          <button id='prev' onClick={() => {
              setIndex((currentIndex - 1 + recipes.length) % recipes.length);
          }}>Previous</button>
          <button id='next' onClick={() => {
              setIndex((currentIndex + 1) % recipes.length);
          }}>Next</button>

          <h1> {title} </h1>
          <div className='recipes' >
              <Recipe index={currentIndex + 1} {...recipe} />
          </div>
      </section>
  );
}