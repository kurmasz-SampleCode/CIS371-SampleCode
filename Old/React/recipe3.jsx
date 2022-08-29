// Sample code available on GitHub: https://github.com/kurmasz-SampleCode/CIS371-SampleCode
// Based on an example from Learning React, 2nd Edition by Porcello and Banks.
// This example is in React/recipe3.jsx
// It is similar to recipe2.jsx; but, illustrates the use of the ... operator.

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

function Ingredient_theLongWay(props) {
    return <li > {props.amount} {props.measurement} {props.name} </li>;
}

function Ingredient({ amount, measurement, name }) {
    return <li > {amount} {measurement} {name} </li>;
}

function IngredientList_theOldWay(props) {
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

function IngredientList({ ingredients }) {
    return <ul className="ingredients" >
        {ingredients.map((item, index) => (<Ingredient {...item} key={index} />))}
    </ul>
}

function Instructions({ steps }) {
    return <div className='instructions'>
        <h3>Instructions</h3>
        {steps.map((step, index) => (<p key={index}>{step}</p>))}
    </div>;
}

function Recipe({ name, index, ingredients, steps }) {
    return <div>
        <h2 > {name} ({index}) </h2>
        <IngredientList ingredients={ingredients} />
        <Instructions steps={steps} />
    </div>;
}

function Menu({ title, recipes }) {
    const [currentIndex, setIndex] = React.useState(0);
    const recipe = recipes[currentIndex];
    return <section>
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
}

ReactDOM.render(
    <Menu recipes={data} title="Sample Recipe List (version 3)" />,
    document.getElementById("main")
);