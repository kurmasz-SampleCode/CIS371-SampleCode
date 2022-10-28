"use strict";

/**
 * Created by kurmasz on 2/10/15.
 */
let Dog = (function () {

    let dogCount = 0;
    let incrementDogCount = function () {
        dogCount++;
    }
    let numDogs = function () {
        return dogCount;
    }


    // constructor
    let init = function (name_in, height_in, weight_in) {

        let name = name_in;
        let height = height_in;
        let weight = weight_in;


        let speak = function () {
            return "Woof";
        };


        let toString = function () {
            // Notice the removal of "this"
            return name + " has height " + height + " and weight " + weight
        };

        // Notice calcBMI must be moved inside makeDog to have
        // access to private data.
        let calcBMI = function () {
            return weight / (height * height);
        };

        let setHeight = function (newHeight) {
            height = newHeight;
        };

        incrementDogCount();

        // If you don't add a function to the list below, it is effectively private.
        return {
            speak: speak,
            toString: toString,
            bmi: calcBMI,
            setHeight: setHeight
        }
    }; // end of init

    return {
        numDogs: numDogs,
        init: init
    }
})();



