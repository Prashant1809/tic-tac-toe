const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPostitions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2.4, 6],
];

function initGames() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // ui pr box ko empty krna pdegsa
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGames();

function swapturn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player -   ${currentPlayer}`;
}

function checkGameOver() {
  let ans = "";
  winningPostitions.forEach((pos) => {
    if (
      (gameGrid[pos[0]] !== "" ||
        gameGrid[pos[1]] !== "" ||
        gameGrid[pos[2]] !== "") &&
      gameGrid[pos[0]] === gameGrid[pos[1]] &&
      gameGrid[pos[1]] === gameGrid[pos[2]]
    ) {
      if (gameGrid[pos[0]] === "X") {
        ans = "X";
      } else {
        ans = "O";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[pos[0]].classList.add("win");
      boxes[pos[1]].classList.add("win");
      boxes[pos[2]].classList.add("win");
    }
  });

  if (ans !== "") {
    gameInfo.innerText = `Winner Player = ${ans}`;
    newGameBtn.classList.add("active");
    return;
  }
  // check for tie

  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.innerText = "game tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(i) {
  if (gameGrid[i] === "") {
    boxes[i].innerText = currentPlayer;
    gameGrid[i] = currentPlayer;
    boxes[i].style.pointerEvents = "none";

    swapturn();

    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", () => {
  initGames();
});
