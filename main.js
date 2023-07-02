const squares = document.querySelectorAll(".square div");
let switcher = "x";
let clicksCount = 0;
let gameEnded = false;
let playWithComputer = true;
let xStatus = "";
let oStatus = "";
const successArray = ["123", "456", "789", "147", "258", "369", "159", "357"];
const winMessage = document.querySelector(".end-game");
const newGameBtn = document.querySelector(".new-game");
const audio = document.getElementById("audio");
const playerWith = document.querySelector(".players-count");
const playerWithBtns = document.querySelectorAll(".players-count button");

playerWithBtns[0].addEventListener("click", () => {
  playerWith.style.opacity = "0";
  playerWith.addEventListener("transitionend", () => {
    playerWith.classList.add("close");
  });
});

playerWithBtns[1].addEventListener("click", () => {
  playerWith.style.opacity = "0";
  playerWith.addEventListener("transitionend", () => {
    playerWith.classList.add("close");
  });
  playWithComputer = false;
});

newGameBtn.onclick = () => window.location.reload();

for (let square of squares) {
  square.removeAttribute("class");
  square.addEventListener("click", (sq) => {
    audio.play();
    clicksCount++;
    let dataValue = sq.target.parentNode.getAttribute("data-value");
    sq.target.classList.add(switcher);
    mainClick(dataValue);
    if (playWithComputer) {
      if (!gameEnded) {
        computerPlayer();
      }
    }
  });
}

function mainClick(dataValue) {
  if (switcher === "x") {
    xStatus += dataValue;
    if (checker(xStatus)) endGame("X");
    switcher = "o";
  } else {
    oStatus += dataValue;
    if (checker(oStatus)) endGame("O");
    switcher = "x";
  }
  if (clicksCount === 9) endGame("tie");
}

function computerPlayer() {
  let restSqrs = Array.from(squares)
    .filter((ele) => !ele.hasAttribute("class"))
    .map((ele) => ele.parentElement.getAttribute("data-value"));

  let randomSquare = getRandom(restSqrs);

  audio.play();
  clicksCount++;

  let dataValue = Array.from(squares)
    .filter((ele) => !ele.hasAttribute("class"))
    [randomSquare].parentElement.getAttribute("data-value");

  Array.from(squares)
    .filter((ele) => !ele.hasAttribute("class"))
    [randomSquare].classList.add(switcher);

  mainClick(dataValue);
}

function getRandom(list = []) {
  let randomSquare = Math.floor(Math.random() * list.length);
  return randomSquare;
}

function checker(xoStatus = "") {
  for (let ele of successArray) {
    if (xoStatus.match(new RegExp("[" + ele + "]", "g")) !== null) {
      if (xoStatus.match(new RegExp("[" + ele + "]", "g")).length === 3) {
        return true;
      } else {
        continue;
      }
    }
  }
  return false;
}

function endGame(winner = "") {
  winMessage.style.display = "flex";
  let msg;
  if (winner === "tie") {
    if (winMessage.innerHTML === "") {
      msg = document.createTextNode(`It's a Tie`);
    }
  } else {
    msg = document.createTextNode(`${winner} player wins.`);
  }
  winMessage.appendChild(msg);
  gameEnded = true;
}
