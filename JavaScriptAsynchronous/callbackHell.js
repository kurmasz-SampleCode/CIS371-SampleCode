/************************************************************************************
 * 
 * callbackHell.js
 * 
 * Demonstrates how multiple callbacks can make for code that is hard to follow.
 *
 ************************************************************************************/
console.log("(a1) Begin!")
setTimeout(() => {
    console.log("(a2) It's time to wake up.")
    setTimeout(() => {
        console.log("(a3) You should be out of bed by now.")
        setTimeout(() => {
            console.log("(a4) Breakfast time is over.  Go brush your teeth.")
            setTimeout(() => {
                console.log("(a5) That's long enough.  Now get to the bus!")
            }, 500)
        }, 2000)
    }, 1500)
}, 1000)

//
// Even using functions doesn't help much.
//

let step5 = () => {
    console.log("(b5) That's long enough.  Now get to the bus!")
}


let step4 = () => {
    console.log("(b4) Breakfast time is over.  Go brush your teeth.")
    setTimeout(step5, 500)
}


let step3 = () => {
    console.log("(b3) You should be out of bed by now.")
    setTimeout(step4, 2000)
}

let step2 = () => {   
    console.log("(b2) It's time to wake up.");
    setTimeout(step3, 1500);
}

let step1 = () => {
    console.log("*******************************")
    console.log("(b1) Begin.");
    setTimeout(step2, 1000);
}

setTimeout(step1, 6000)