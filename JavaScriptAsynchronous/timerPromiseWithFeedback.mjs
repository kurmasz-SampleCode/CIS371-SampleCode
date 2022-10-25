/************************************************************************************
 * 
 * timerPromiseWithFeedback.js
 * 
 * Imagine doing this with straight callbacks.
 *
 ************************************************************************************/

import * as readline from 'readline';


 // I put this here because, in my opinion, the entire program should use the same io object.\
 const io = readline.createInterface({
     input: process.stdin,
     output: process.stdout,
   });


let askAreYouUp = () => {
    return new Promise( (resolve, reject) => {
        io.question("Are you? ", (line) => {
            if (line.toLocaleLowerCase().trim().startsWith('y')) {
                console.log("(d3b) Good. Go eat breakfast");
                resolve(); 
            } else {
                reject("Not again :( ")
            }
        })
    })
}

let setTimer = (delay)  => {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, delay)
    })
}

console.log("(d1) Begin.")
setTimer(1000).then( () => {
    console.log("(d2) It's time to wake up.")
    return setTimer(1500)
}).then( () => {
    console.log("(d3) You should be out of bed by now.")
    return askAreYouUp()
}).then( (line) => {    
        return setTimer(2000) 
}).then( () => {
     console.log("(d4) Breakfast time is over.  Go brush your teeth.")
     return setTimer(500)
}).then( () => {
    console.log("(d5) That's long enough.  Now get to the bus!")
}).catch( (message) => {
    console.log(message)
}).finally( () => io.close())

