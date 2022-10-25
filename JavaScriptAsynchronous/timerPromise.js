/************************************************************************************
 * 
 * timerPromise.js
 * 
 * Using promises lets us clean up code.
 *
 ************************************************************************************/


let setTimer = (delay)  => {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, delay)
    })
}

console.log("(c1) Begin.")
setTimer(1000).then( () => {
    console.log("(c2) It's time to wake up.")
    return setTimer(1500)
}).then( () => {
    console.log("(c3) You should be out of bed by now.")
    return setTimer(2000)
}).then( () => {
     console.log("(c4) Breakfast time is over.  Go brush your teeth.")
     return setTimer(500)
}).then( () => {
    console.log("(c5) That's long enough.  Now get to the bus!")
})