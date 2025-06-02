let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");


// Start game on key press
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

// Level Up
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  scoreDisplay.innerText = `Current Score: ${level}`; // update score

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  let randBtn = document.querySelector(`#${randColor}`);
  gameFlash(randBtn);
  playSound(randColor);
}


// Flash effect for game sequence
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash effect for user press
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Sound effect
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Check user's answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => levelUp(), 1000);
    }
  } else {
    playSound("wrong");
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "#f9f9f9";
    }, 150);
    resetGame();
  }
}

// When user clicks a button
function btnPress() {
  let btn = this;
  let userColor = btn.id;
  userSeq.push(userColor);
  userFlash(btn);
  playSound(userColor);
  checkAns(userSeq.length - 1);
}

// Attach listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
  btn.addEventListener("click", btnPress);
});

// Reset game state
function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
