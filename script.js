"use strict";

// Arrays holding paths to correct animations and sounds
const correctAnimations = [
  "images/correct/griddy.gif",
  "images/correct/griddymls.gif",
  "images/correct/dancing.webp",
  "images/correct/alien.gif",
  "images/correct/awwyeah.gif",
  "images/correct/carlton.gif",
  "images/correct/boy.gif",
  "images/correct/disco.webp",
  "images/correct/floss.gif",
  "images/correct/bolt.webp",
  "images/correct/fnitedance.gif",
];

const correctSounds = [
  "sounds/correct/correct1.mp3",
  "sounds/correct/correct2.mp3",
  "sounds/correct/correct3.mp3",
  "sounds/correct/correct4.mp3",
  "sounds/correct/ohyeah.mp3",
  "sounds/correct/correct6.mp3",
  "sounds/correct/griddy.mp3",
];

// Arrays for incorrect animations and sounds
const incorrectAnimations = [
  "images/incorrect/oscar.gif",
  "images/incorrect/oscar2.gif",
  "images/incorrect/girl.gif",
  "images/incorrect/bean.gif",
  "images/incorrect/dumb.gif",
  "images/incorrect/kid.gif",
  "images/incorrect/reegan.gif",
  "images/incorrect/deadpool.gif",
];

const incorrectSounds = [
  "sounds/incorrect1.mp3",
  "sounds/incorrect2.mp3",
  "sounds/incorrect3.mp3",
  "sounds/incorrect4.mp3",
  "sounds/incorrect5.mp3",
  "sounds/incorrect6.mp3",
];

// Array for "lost game" animations
const lostAnimations = [
  "images/lost/crying.webp",
  "images/lost/crying2.webp",
  "images/lost/crying3.webp",
  "images/lost/anger.webp",
  "images/lost/anger2.webp",
  "images/lost/anger3.webp",
];

// Function to hide all animations by removing the "show-animation" class from the respective elements
const hideAnimations = function () {
  document
    .getElementById("correct-animation")
    .classList.remove("show-animation");
  document
    .getElementById("incorrect-animation")
    .classList.remove("show-animation");
  document.getElementById("lost-game").classList.remove("show-animation");
};

// Function to show a random correct animation
let audio; // Declare the audio variable globally so it can be reused
const showCorrectAnimation = function () {
  // Select a random animation from the correctAnimations array
  const randomAnimation =
    correctAnimations[Math.floor(Math.random() * correctAnimations.length)];

  // Set the inner HTML of the correct-animation div to display the selected animation
  document.getElementById(
    "correct-animation"
  ).innerHTML = `<img src="${randomAnimation}" alt="Correct Animation">`;

  // Add the "show-animation" class to trigger CSS animations
  document.getElementById("correct-animation").classList.add("show-animation");

  // Select the correct sound based on the animation and play it
  if (
    randomAnimation === "images/correct/griddy.gif" ||
    randomAnimation === "images/correct/griddymls.gif"
  ) {
    audio = new Audio("sounds/correct/griddy.mp3");
    audio.play();
  } else if (randomAnimation === "images/correct/awwyeah.gif") {
    audio = new Audio("sounds/correct/awwyeah.mp3");
    audio.play();
  } else if (
    randomAnimation === "images/correct/disco.webp" ||
    randomAnimation === "images/correct/boy.gif"
  ) {
    audio = new Audio("sounds/correct/disco.mp3");
    audio.play();
  } else if (
    randomAnimation === "images/correct/fnitedance.gif" ||
    randomAnimation === "images/correct/alien.gif"
  ) {
    audio = new Audio("sounds/correct/fortnite.mp3");
    audio.play();
  } else if (randomAnimation === "images/correct/carlton.gif") {
    audio = new Audio("sounds/correct/tomjones.mp3");
    audio.play();
  } else if (randomAnimation === "images/correct/floss.gif") {
    audio = new Audio("sounds/correct/floss.mp3");
    audio.play();
  } else if (randomAnimation === "images/correct/dancing.webp") {
    audio = new Audio("sounds/correct/dance.mp3");
    audio.play();
  } else {
    audio = new Audio("sounds/correct/correct6.mp3");
    audio.play();
  }
};

// Function to show a random incorrect animation
const showIncorrectAnimation = function () {
  // Select a random animation from the incorrectAnimations array
  const randomAnimation =
    incorrectAnimations[Math.floor(Math.random() * incorrectAnimations.length)];

  // Set the inner HTML of the incorrect-animation div to display the selected animation
  document.getElementById(
    "incorrect-animation"
  ).innerHTML = `<img src="${randomAnimation}" alt="Incorrect Animation">`;

  // Add the "show-animation" class to trigger CSS animations
  document
    .getElementById("incorrect-animation")
    .classList.add("show-animation");

  // Select a random incorrect sound and play it
  const randomSound =
    incorrectSounds[Math.floor(Math.random() * incorrectSounds.length)];
  const incorrectSound = new Audio(randomSound);
  incorrectSound.play();
};

// Function to show a random animation for losing the game
const showLostAnimation = function () {
  const randomAnimation =
    lostAnimations[Math.floor(Math.random() * lostAnimations.length)];

  // Set the inner HTML of the lost-game div to display the selected animation
  document.getElementById(
    "lost-game"
  ).innerHTML = `<img src="${randomAnimation}" alt="Lost game Animation">`;

  // Add the "show-animation" class to trigger CSS animations
  document.getElementById("lost-game").classList.add("show-animation");
};

// Variables for game state
let level = 1;
let score = 0;
let levelScore = 0;
let highScore = 0;
let currentAnswer = 0;

// Cache HTML elements for quick access
const bodyElem = document.querySelector("body");
const number1Elem = document.querySelector(".number1");
const number2Elem = document.querySelector(".number2");
let number3Elem = document.querySelector(".number3"); // Declared as 'let' since it may be replaced dynamically
const operator1Elem = document.querySelector(".operator1");
let operator2Elem = document.querySelector(".operator2");
const answerElem = document.querySelector(".answer");
const scoreElem = document.querySelector(".score");
const highScoreElem = document.querySelector(".highscore");
const messageElem = document.querySelector(".message");
const userInputElem = document.getElementById("calc");
const checkButton = document.querySelector(".check");
const restartButton = document.querySelector(".restart");
const nextButton = document.querySelector(".next");
const nextLevelButton = document.querySelector(".level");
const feedbackElem = document.querySelector(".feedback");
const headingElem = document.querySelector(".slide-inX");

// Function to add new elements to the DOM for multi-operation levels
const addElements = function () {
  const newNumber = document.createElement("div");
  const newOperator = document.createElement("div");

  newNumber.innerHTML = "?";
  newOperator.innerHTML = "?";

  newNumber.className = "number number3";
  newOperator.className = "number operator2";

  const boxesDiv = document.querySelector(".boxes");
  const targetDiv = document.querySelector(".number2");

  // Insert new elements into the DOM
  boxesDiv.insertBefore(newOperator, targetDiv.nextSibling);
  boxesDiv.insertBefore(newNumber, newOperator.nextSibling);

  // Update references to the new elements
  number3Elem = newNumber;
  operator2Elem = newOperator;
};

// Function to remove elements from the DOM
const removeElements = function () {
  const numberToRemove = document.querySelector(".number3");
  const operatorToRemove = document.querySelector(".operator2");

  if (numberToRemove) {
    numberToRemove.remove();
  }
  if (operatorToRemove) {
    operatorToRemove.remove();
  }
};

// Helper function to generate a random number between min and max
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Functions to generate math problems based on the current level

// Level 1: Addition or subtraction
const generateLevel1Expression = function () {
  const number1 = getRandomNumber(10, 100);
  const number2 = getRandomNumber(10, number1);
  const operator1 = Math.random() > 0.5 ? "+" : "-";

  const problem = `${number1} ${operator1} ${number2}`;
  const answer = eval(problem);
  return { number1, number2, operator1, answer };
};

// Level 2: Combination of two operations
const generateLevel2Expression = function () {
  const number1 = getRandomNumber(10, 100);
  const number2 = getRandomNumber(2, number1);
  const number3 = getRandomNumber(2, number2);
  const operator1 = Math.random() > 0.5 ? "+" : "-";
  const operator2 = operator1 === "+" ? "-" : "+";

  const problem = `${number1} ${operator1} ${number2} ${operator2} ${number3}`;
  const answer = eval(problem);
  return { number1, number2, number3, operator1, operator2, answer };
};

// Level 3: Multiplication
const generateLevel3Expression = function () {
  const number1 = getRandomNumber(10, 100);
  const number2 = getRandomNumber(2, 10);
  const operator1 = "*";

  const problem = `${number1} ${operator1} ${number2}`;
  const answer = number1 * number2;
  return { number1, number2, operator1, answer };
};

// Level 4: Division
const generateLevel4Expression = function () {
  const number2 = getRandomNumber(2, 10);
  const multiples = [];

  // Find multiples of number2 up to 100
  for (let i = number2; i <= 100; i++) {
    if (i % number2 === 0) {
      multiples.push(i);
    }
  }

  const number1 = multiples[Math.floor(Math.random() * multiples.length)];
  const operator1 = "/";

  const problem = `${number1} ${operator1} ${number2}`;
  const answer = number1 / number2;
  return { number1, number2, operator1, answer };
};

// Level 5: More complex combination of operations
const generateLevel5Expression = function () {
  let number1;
  let number2;
  const number3 = getRandomNumber(2, 10);
  const operator1 = Math.random() > 0.5 ? "+" : "-";
  const operator2 = Math.random() > 0.5 ? "*" : "/";

  let answer;

  if (operator2 === "/") {
    const multiples = [];

    // Find multiples of number3
    for (let i = number3; i <= 50; i++) {
      if (i % number3 === 0) {
        multiples.push(i);
      }
    }
    number2 = multiples[Math.floor(Math.random() * multiples.length)];
    number1 = getRandomNumber(number2, 100);
  } else {
    number2 = getRandomNumber(2, 50);
    const intermediateResult = number2 * number3;
    number1 = getRandomNumber(intermediateResult, 100);
  }

  const problem = `${number1} ${operator1} ${number2} ${operator2} ${number3}`;
  answer = eval(problem);
  return { number1, number2, number3, operator1, operator2, answer };
};

// Function to return an expression based on the current level
const getExpression = function (level) {
  switch (level) {
    case 1:
      return generateLevel1Expression();
    case 2:
      return generateLevel2Expression();
    case 3:
      return generateLevel3Expression();
    case 4:
      return generateLevel4Expression();
    case 5:
      return generateLevel5Expression();
  }
};

// Declare a variable to store the previous level
let previousLevel = level;

// Initialize the problem for the current level
let { number1, operator1, number2, operator2, number3, answer } =
  getExpression(level);

// Function to update the math expression in the DOM
const updateExpression = function () {
  number1Elem.textContent = number1;
  operator1Elem.textContent = operator1;
  number2Elem.textContent = number2;
  headingElem.textContent = `Level ${level}`;

  // Check if the level has changed
  if (level !== previousLevel) {
    // Remove the animation class to reset the animation
    headingElem.classList.remove("slide-inX");

    // Force a reflow to allow the animation to be re-applied
    void headingElem.offsetWidth; // Forces the browser to recalculate layout (reflow)

    // Re-add the animation class to trigger the slide-in effect
    headingElem.classList.add("slide-inX");

    // Update previousLevel to the current level
    previousLevel = level;
  }

  // If the level requires two operations, dynamically add elements
  if (level === 2 || level === 5) {
    removeElements();
    addElements();
    operator2Elem.textContent = operator2;
    number3Elem.textContent = number3;
  } else {
    removeElements();
  }
};

// Function to display a message in the message element
const displayMessage = function (message) {
  messageElem.textContent = message;
};

// Function to reset the game state and UI
const reset = function () {
  displayMessage("Calculate the answer...");
  number1Elem.textContent = number1;
  operator1Elem.textContent = operator1;
  number2Elem.textContent = number2;
  scoreElem.textContent = score;
  answerElem.textContent = "?";
  userInputElem.value = "";
  bodyElem.style.backgroundColor = "#222";
  answerElem.style.width = "15rem";
  feedbackElem.innerHTML = "";
  hideAnimations(); // Hide animations on reset
  if (audio) audio.pause(); // Stop any currently playing audio
  feedbackElem.classList.remove("bounce"); // Reset the feedback animation
};

// Initialize the expression for the first time
updateExpression();

// Function to check if the user's answer is correct
const checkAnswer = function () {
  const calc = Number(userInputElem.value); // Convert input value to a number

  if (!calc && calc !== 0) {
    messageElem.textContent = "⛔ No Answer"; // Warn if no answer was given
  } else if (calc === answer) {
    levelScore++;
    score++;
    messageElem.textContent = "🎉 Correct!";
    showCorrectAnimation();
    answerElem.textContent = answer;
    bodyElem.style.backgroundColor = "#60b347"; // Change background to green on correct answer
    messageElem.style.fontSize = "4rem";
    messageElem.style.padding = "1rem";
    answerElem.style.width = "20rem";
    scoreElem.textContent = score;

    if (score > highScore) {
      highScore = score; // Update high score
    }
    highScoreElem.textContent = highScore;

    checkButton.disabled = false; // Ensure the button stays enabled
  } else if (calc !== answer) {
    if (levelScore > 1) {
      messageElem.textContent = `😞 Wrong answer. The correct answer is ${answer}. -1 point`;
      showIncorrectAnimation();
      messageElem.style.fontSize = "3rem";
      messageElem.style.padding = "1rem";
      score--;
      levelScore--;
      scoreElem.textContent = score;
    } else if (score === 0 && level === 1) {
      messageElem.textContent = `💥 You lost the game! The correct answer is ${answer}`;
      scoreElem.textContent = 0;
      showLostAnimation(); // Show lost game animation if no points left
      nextButton.disabled = true;
    } else if (levelScore === 0 && level > 1) {
      level--;
      messageElem.textContent = `😞 Wrong answer. The correct answer is ${answer}. You've gone back to level ${level}`;
      userInputElem.value = "";
      ({ number1, operator1, number2, operator2, number3, answer } =
        getExpression(level)); // Go back to previous level and generate a new problem
      updateExpression();
      checkButton.disabled = false; // Ensure the button stays enabled
    }
  }

  if (levelScore >= 5) {
    level++; // Move to next level after 5 correct answers
    levelScore = 0;
    feedbackElem.innerHTML = `Congratulations!<br>Moving to level ${level}!`;
    feedbackElem.classList.add("bounce");
    checkButton.disabled = false;
  }

  if (level > 5) {
    feedbackElem.innerHTML = "Congratulations!<br>You've completed all levels!";
    feedbackElem.classList.add("bounce");
  }
};

// Function to move to the next problem
const goToNext = function () {
  ({ number1, operator1, number2, operator2, number3, answer } =
    getExpression(level)); // Get new problem
  updateExpression();
  reset(); // Reset UI and animations
  checkButton.disabled = false; // Ensure the check button is enabled
};

// Event listener for the "check" button to verify the answer
checkButton.addEventListener("click", checkAnswer);

// Event listener to trigger "check" on Enter key press
document.addEventListener("keydown", function (e) {
  const calc = Number(userInputElem.value);

  if (e.key === "Enter" && calc) {
    checkAnswer();
  }
});

// Event listener for the "next" button to move to the next problem
nextButton.addEventListener("click", goToNext);

// Event listener to move to the next problem on right arrow key press
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight" && calc) {
    goToNext();
  }
});

// Event listener to reset the game on "restart" button click
restartButton.addEventListener("click", function () {
  score = 0;
  level = 1;
  ({ number1, operator1, number2, operator2, number3, answer } =
    getExpression(level)); // Start over at level 1
  updateExpression();
  reset(); // Reset UI
  checkButton.disabled = false;
  nextButton.disabled = false;
  nextLevelButton.disabled = false;
});

// Event listener for the "next level" button to skip to the next level
nextLevelButton.addEventListener("click", function () {
  level++;
  ({ number1, operator1, number2, operator2, number3, answer } =
    getExpression(level)); // Move to the next level
  updateExpression();
  audio.pause(); // Stop any currently playing audio
  checkButton.disabled = false;
  feedbackElem.innerHTML = ""; // Clear feedback messages
  if (level === 5) nextLevelButton.disabled = true; // Disable the next level button at the final level
});
