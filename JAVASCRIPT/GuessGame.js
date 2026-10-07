// Guess the Number Game - 4 Digit Number

// Hard coded 4 digit number
const secretNumber = "1234";

function playGame() {
  let isCorrect = false;
  let attempts = 0;

  while (!isCorrect) {
    attempts++;

    // Get user input
    let userGuess = prompt("Guess the 4-digit number:");

    // Validate input
    if (userGuess === null) {
      alert("Game cancelled!");
      return;
    }

    if (userGuess.length !== 4 || isNaN(userGuess)) {
      alert("Please enter a valid 4-digit number!");
      continue;
    }

    // Check if guess is correct
    if (userGuess === secretNumber) {
      isCorrect = true;
      alert("You are amazing human/genius.");
      break;
    }

    // Count correct digits
    let correctDigits = 0;
    for (let i = 0; i < secretNumber.length; i++) {
      if (userGuess.includes(secretNumber[i])) {
        correctDigits++;
      }
    }

    // Count correct positions
    let correctPositions = 0;
    for (let i = 0; i < secretNumber.length; i++) {
      if (userGuess[i] === secretNumber[i]) {
        correctPositions++;
      }
    }

    // Count wrong positions (digits present but in wrong position)
    let wrongPositions = correctDigits - correctPositions;

    // Feedback message
    let feedback = `Attempt ${attempts}:\n`;
    feedback += `Correct digits: ${correctDigits}\n`;
    feedback += `Correct positions: ${correctPositions}\n`;
    feedback += `Wrong positions: ${wrongPositions}`;

    alert(feedback);
  }
}

// Start the game
playGame();
