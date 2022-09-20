console.log("Notice that Javascript runs asynchronously:");
setTimeout(() => console.log('Callback after 3 seconds'), 3000);
setTimeout(() => console.log('Callback after 2 seconds'), 2000);
setTimeout(() => console.log('Callback after 1 seconds'), 1000);


callback2 = function(delay) { console.log(`Callback v2 after ${delay} seconds`) };

setTimeout(() => console.log("We can also use helper methods:"));
setTimeout(() => callback2(5), 5000);
setTimeout(() => callback2(5.5), 5500);
setTimeout(() => callback2(6), 6000);

demonstrateIncorrectClosures = function() {

    console.log("About to demonstrate incorrect use of closures.");
    let x = 0;
    callback3 = function() {
        console.log(`Callback v3 after ${x} seconds`);
    };

    // Notice that both callbacks will print "1.5".
    x = 1.5;
    setTimeout(callback3, 1500);
    x = 2.5;
    setTimeout(callback3, 2500);
};
setTimeout(() => demonstrateIncorrectClosures(), 6000);

demonstrateCorrectClosures = function() {

    console.log("About to demonstrate the correct use of closures.");
    makeCallback = function(value) {
        return function() {
            console.log(`Callback v3 after ${value} seconds`);
        };
    };

    setTimeout(makeCallback(1.5), 1500);
    setTimeout(makeCallback(2.5), 2500);
};

setTimeout(() => demonstrateCorrectClosures(), 9000);