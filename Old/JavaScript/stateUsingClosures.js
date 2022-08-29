// Gives a rough idea of how the React useState hook might work.
// (In reality, it is much more complex.)
// Other articles:
//   https://dev.to/lizraeli/implementing-the-usestate-hook-3nd7
//   https://medium.com/the-guild/under-the-hood-of-reacts-hooks-system-eb59638c9dba

let makeState = function(initialValue) {

    let current = initialValue;

    let get = () => current;

    let update = (newValue) => {
        current = newValue;
    }

    return [get, update];
};

console.log("Welcome!");

let [getTemp, setTemp] = makeState(55);
let [getHumidity, setHumidity] = makeState(44.5);

console.log(`Current conditions:  ${getTemp()}, ${getHumidity()}`)

setTemp(72);
setHumidity(12);

console.log(`New conditions:  ${getTemp()}, ${getHumidity()}`)