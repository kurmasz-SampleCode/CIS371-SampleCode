// Sample code available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// Based on an example from Learning React, 2nd Edition by Porcello and Banks.
// This example is in React/recipe2.jsx
// It is similar to recipe1.jsx; but, illustrates the use of the useState hook.

const data = [{
    name: "Baked Salmon",
    ingredients: [
        { name: "Salmon", amount: 1, measurement: "l lb" },
        { name: "Pine Nuts", amount: 1, measurement: "cup" },
        { name: "Butter Lettuce", amount: 2, measurement: "cups" },
        { name: "Yellow Squash", amount: 1, measurement: "med" },
        { name: "Olive Oil", amount: 0.5, measurement: "cup" },
        { name: "Garlic", amount: 3, measurement: "cloves" }
    ],
    steps: [
        "Preheat the oven to 350 degrees.",
        "Spread the olive oil around a glass baking dish.",
        "Add the yellow squash and place in the oven for 30 mins.",
        "Add the salmon, garlic, and pine nuts to the dish.",
        "Bake for 15 minutes.",
        "Remove from oven. Add the lettuce and serve."
    ]
},
{
    name: "Fish Tacos",
    ingredients: [
        { name: "Whitefish", amount: 1, measurement: "l lb" },
        { name: "Cheese", amount: 1, measurement: "cup" },
        { name: "Iceberg Lettuce", amount: 2, measurement: "cups" },
        { name: "Tomatoes", amount: 2, measurement: "large" },
        { name: "Tortillas", amount: 3, measurement: "med" }
    ],
    steps: [
        "Cook the fish on the grill until cooked through.",
        "Place the fish on the 3 tortillas.",
        "Top them with lettuce, tomatoes, and cheese."
    ]
},
{
    name: "Fruit Smoothie",
    ingredients: [
        { name: "Banana", amount: 1, measurement: "large" },
        { name: "Strawberries", amount: 1, measurement: "cup" },
        { name: "Blueberries", amount: 0.5, measurement: "cup" },
        { name: "Orange Juice", amount: 1, measurement: "cup" },
    ],
    steps: [
        "Put all ingredients in the blender",
        "Blend until smooth"
    ]
}
];

function Ingredient(props) {
    return <li > {props.amount} {props.measurement} {props.name} </li>;
}

function IngredientList(props) {
    return <ul className="ingredients" > {
        props.ingredients.map((item, index) => (
            <Ingredient amount={item.amount}
                measurement={item.measurement}
                name={item.name}
                key={index}
            />
        ))}
    </ul>
}

function Instructions(props) {
    return <div className='instructions'>
        <h3>Instructions</h3>
        {props.steps.map((step, index) => (<p key={index}>{step}</p>))}
    </div>;
}

function Recipe(props) {
    return <div>
        <h2 > {props.name} ({props.index}) </h2>
        <IngredientList ingredients={props.ingredients} />
        <Instructions steps={props.steps} />
    </div>;
}

function Menu_broken(props) {
    // NOTE:  This DOESN'T work.  It is just here as a stepping stone.
   let currentIndex = Math.floor(props.recipes.length /2)
    const recipe = props.recipes[currentIndex];
    console.log("Hi there")
    console.log(currentIndex)
    console.log(recipe)
    return <section>

        <button id='prev' onClick={() => {
            console.log("Previous")
            --currentIndex
        }}>Previous</button>
        
        <button id='next' onClick={() => {
            console.log("Next")
            ++currentIndex
        }}>Next</button>

        <h1> {props.title} </h1>
        <div className='recipes' >
            <Recipe
                index={currentIndex + 1}
                name={recipe.name}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
            />
        </div>
    </section>;
}


function Menu(props) {
    const [currentIndex, setIndex] = React.useState(0);
    const recipe = props.recipes[currentIndex];
    return <section>

        <button id='prev' onClick={() => {
            setIndex((currentIndex - 1 + props.recipes.length) % props.recipes.length);
        }}>Previous</button>
        
        <button id='next' onClick={() => {
            setIndex((currentIndex + 1) % props.recipes.length);
        }}>Next</button>

        <h1> {props.title} </h1>
        <div className='recipes' >
            <Recipe
                index={currentIndex + 1}
                name={recipe.name}
                ingredients={recipe.ingredients}
                steps={recipe.steps}
            />
        </div>
    </section>;
}

ReactDOM.render(
    <Menu recipes={data} title="Sample Recipe List  (version 2)" />,
    document.getElementById("main")
);