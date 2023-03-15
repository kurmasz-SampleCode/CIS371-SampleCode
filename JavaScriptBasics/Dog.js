"use strict";

/**
 * Created by kurmasz on 2/10/15.
 */
var Dog = (function () {

    var dogCount = 0;
    var incrementDogCount = function () {
        dogCount++;
    }
    var numDogs = function () {
        return dogCount;
    }


    // constructor
    var init = function (name_in, height_in, weight_in) {

        var name = name_in;
        var height = height_in;
        var weight = weight_in;


        var speak = function () {
            return "Woof";
        };


        var toString = function () {
            // Notice the removal of "this"
            return name + " has height " + height + " and weight " + weight
        };

        // Notice calcBMI must be moved inside makeDog to have
        // access to private data.
        var calcBMI = function () {
            return weight / (height * height);
        };

        var setHeight = function (newHeight) {
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

