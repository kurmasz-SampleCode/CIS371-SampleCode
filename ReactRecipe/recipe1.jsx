// Sample code available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// Based on an example from Learning React, 2nd Edition by Porcello and Banks.
// This example is in ReactRecipe/recipe1.jsx

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
    return <li> {props.amount} {props.measurement} {props.name} </li>;
}

/* Note:  You would not normally write it this way.  I include this Demo in case it is easier to
   understand than the "real" version below that uses .map */
function IngredientListDemo(props) {
    let list = props.ingredients;
    return <ul className="ingredients" >
        <Ingredient amount={list[0].amount} measurement={list[0].measurement} name={list[0].name} key='0' />
        <Ingredient amount={list[1].amount} measurement={list[1].measurement} name={list[1].name} key='1' />
        <Ingredient amount={list[2].amount} measurement={list[2].measurement} name={list[2].name} key='2' />
        <Ingredient amount={list[3].amount} measurement={list[3].measurement} name={list[3].name} key='3' />
    </ul>;
}

function IngredientList(props) {
    return <ul className="ingredients" > {
        props.ingredients.map((item, index) => (
            <Ingredient amount={item.amount} measurement={item.measurement} name={item.name} key={index} />
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
        <h2 onClick={() => console.log(`You clicked on recipe ${props.name}`)}> {props.name} </h2>
        <IngredientList ingredients={props.ingredients} />
        <Instructions steps={props.steps} />
    </div>;
}

function Menu(props) {
    return <section>
        <h1> {props.title} </h1>
        <div className='recipes' > {props.recipes.map((recipe, index) => (
            <Recipe key={index}
                name={recipe.name}
                ingredients={recipe.ingredients}
                steps={recipe.steps}                
            />
        ))}
        </div>
    </section>;
}

ReactDOM.render(
    <Menu recipes={data} title="Sample Recipe List #1" />,
    document.getElementById("main")
);
 