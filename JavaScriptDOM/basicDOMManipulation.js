///////////////////////////////////////////////////
//
// Demonstrate event listeners and callbacks 
//
//////////////////////////////////////////////////


let colorNames = function(color) {
    let names = document.getElementsByClassName('toyName');
    // Note:  names is not an array, so you can't use names.forEach()
    for (let i = 0; i < names.length; ++i) {
        names[i].style.color = color;
    }
};
colorNames('blue');

let blackNames = function() {
    colorNames('black');
}

// Note: The function() syntax and the () => syntax are nearly identical.
// The main difference is how each handles the 'this' parameter.
document.getElementById('blackNames').addEventListener('click', blackNames);
document.getElementById('greenNames').addEventListener('click', function() {
    colorNames('green');
});
document.getElementById('purpleNames').addEventListener('click', () => {
    colorNames('purple')
});
document.getElementById('orangeNames').addEventListener('click', () => colorNames('orange'));

/////////////////////////////////////////////////////////////////////
//
// Demonstrate hiding parts of the DOM in response to user input
//
/////////////////////////////////////////////////////////////////////

// Notice that each price element gets its own listener; however,
// the callback then hides *all* prices.
prices = document.getElementsByClassName('price');

// Note:  prices is an HTMLCollection, _not_ an array.
// Consequently, you can't call Array methods like forEach and map.
console.log("Prices:")
console.log(prices);

for (let i = 0; i < prices.length; ++i) {
    prices[i].addEventListener('click', function(event) {
        // When anything in the column is clicked, hide *all* the prices
        for (let i = 0; i < prices.length; ++i) {
            prices[i].style.display = 'none';
        };
    });
}

///////////////////////////////////////////////////
//
// Demonstrate adding elements to the DOM
//
//////////////////////////////////////////////////

let colors = ['Aqua', 'Aquamarine', 'Blue Violet', 'Cadet Blue', 'Chartreuse', 'Deep Pink']
let buttonPlace = document.getElementById('manColorList');
colors.forEach((color) => {
    let newButton = document.createElement("button");
    newButton.innerHTML = color;
    buttonPlace.appendChild(newButton);

    newButton.addEventListener('click', () => {
        let manufacturers_asHTMLCollection = document.getElementsByClassName('manufacturer');

        // As above, manufacturers is an HTMLCollection.
        // You can convert to a standard array using Array.from
        let manufacturers = Array.from(manufacturers_asHTMLCollection);

        manufacturers.forEach((item) => {
            let htmlColor = color.replace(/\s+/, '');
            item.style.color = htmlColor;
        });
    });
});


///////////////////////////////////////////////////
//
// Demonstrate reacting to form changes
//
//////////////////////////////////////////////////

let input = document.getElementsByName('threshold')[0];
let errorMsg = document.getElementById('errorMessage');
input.addEventListener("change", () => {
    errorMsg.innerHTML = ''; // Clear the error
    let prices = document.getElementsByClassName('price');
    let thresholdPrice = parseFloat(input.value);
    if (isNaN(thresholdPrice)) {
        errorMsg.innerHTML = "Threshold must be a number";
    } else {
        for (let i = 0; i < prices.length; ++i) {
            let displayPrice = parseFloat(prices[i].textContent);
            if (!isNaN(displayPrice) && displayPrice > thresholdPrice) {
                prices[i].style.color = 'red';
            }
        } // end for
    } // end else
});