/************************************************************************************
 * 
 * timerPromiseAwait.js
 * 
 * Demonstrates the use of await.
 *
 ************************************************************************************/

import * as readline from 'readline';


 // I put this here because, in my opinion, the entire program should use the same io object.\
 const io = readline.createInterface({
     input: process.stdin,
     output: process.stdout,
   });


let askQuestion = (prompt) => {
    return new Promise( (resolve, reject) => {
        io.question(prompt, (line) => resolve(line))
    })
}

let setTimer = (delay)  => {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, delay)
    })
}

console.log("(e1) Begin.")
await setTimer(1000)
console.log("(e2) It's time to wake up.")
await setTimer(1500)
console.log("(e3) You should be out of bed by now.")
let answer = await askQuestion("Are you? ")
if (answer.toLocaleLowerCase().trim().startsWith('y')) {
    console.log("(d3b) Good. Go eat breakfast");
    await setTimer(2000) 
    console.log("(d4) Breakfast time is over.  Go brush your teeth.")
    await setTimer(500)
    console.log("(d5) That's long enough.  Now get to the bus!")
} else {
    console.log("Not again :( ")
}
io.close()

