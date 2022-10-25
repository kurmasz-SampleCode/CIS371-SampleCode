import * as readline from 'node:readline';

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let turn = (num, answer) => {
    io.question(`(${num}) What is your guess? `, line => {
      let guess = Number.parseInt(line);
      if (!Number.isInteger(guess)) {
        console.log(`=>${line}<= is not an integer. Please try again.`);
        turn(num, answer);
      } else if (guess < 1 || guess > 100) {
        console.log(`Guesses must be in the range [1, 100]. Please try again`);
        turn(num, answer);
      } else if (guess == answer) {
        console.log(`Congratulations. You win. It took you ${num} guesses.`);        
      } else if (guess < answer) {
        console.log(`Your guess is too low. Please try again.`);
        turn(num + 1, answer);
      } else if (guess > answer) {
        console.log(`Your guess is too high. Please try again.`);
        turn(num + 1, answer);
      } else {
        console.log("This can't happen! You broke the game!");
      }
    });
  }

  turn(1, 73);
