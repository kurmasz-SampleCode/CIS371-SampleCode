import React from "react";
import IngredientList from "./IngredientList.jsx";
import Instructions from "./Instructions.jsx"


export default function Recipe({ name, index, ingredients, steps }) {
    return (
        <div>
            <h2 > {name} ({index}) </h2>
            <IngredientList ingredients={ingredients} />
            <Instructions steps={steps} />
        </div>
    );
}