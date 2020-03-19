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