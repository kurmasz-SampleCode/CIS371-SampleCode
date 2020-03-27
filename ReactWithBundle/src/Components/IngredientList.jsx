import React from "react"
import Ingredient from  "./Ingredient.jsx"

export default function IngredientList({ ingredients }) {
  return (
      <ul className="ingredients" >
          {ingredients.map((item, index) => (<Ingredient {...item} key={index} />))}
      </ul>
  );
}