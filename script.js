document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".game-container");
    const gridContainer = document.querySelector(".grid-container");
    const scoreElement = document.getElementById("score");
    const gameOverElement = document.getElementById("game-over");
    const restartButton = document.getElementById("restart-button");
    let score = 0;
    let gameGrid = [];
  
    function initializeGrid() {
      for (let i = 0; i < 4; i++) {
        gameGrid[i] = [];
        for (let j = 0; j < 4; j++) {
          gameGrid[i][j] = 0;
        }
      }
      addNewTile();
      addNewTile();
      renderGrid();
    }
  
    function renderGrid() {
      gridContainer.innerHTML = "";
      gameGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          const cellElement = document.createElement("div");
          cellElement.className = "cell";
          cellElement.innerText = cell === 0 ? "" : cell;
          cellElement.style.backgroundColor = getTileColor(cell);
          gridContainer.appendChild(cellElement);
  
          // Animation
          if (cell !== 0) {
            cellElement.classList.add("animate");
            setTimeout(() => {
              cellElement.classList.remove("animate");
            }, 200);
          }
        });
      });
      scoreElement.innerText = score;
    }
  
    function addNewTile() {
      const availableCells = [];
      gameGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === 0) {
            availableCells.push({ row: i, col: j });
          }
        });
      });
  
      if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const { row, col } = availableCells[randomIndex];
        gameGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
      }
    }
  
    function getTileColor(value) {
      const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
      };
      return colors[value] || "#cdc1b4";
    }
  
    function move(direction) {
      const oldGrid = JSON.parse(JSON.stringify(gameGrid)); // Grid
      let moved = false;
  
      // Moving titles (numbers)
      switch (direction) {
        case "left":
          moved = moveLeft();
          break;
        case "right":
          moved = moveRight();
          break;
        case "up":
          moved = moveUp();
          break;
        case "down":
          moved = moveDown();
          break;
      }
  
      if (moved) {
        addNewTile();
        renderGrid();
  
        if (isGameOver()) {
          gameOverElement.style.display = "block";
        }
      }
    }
  
    function moveLeft() {
      let moved = false;
  
      for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          if (gameGrid[i][j] !== 0) {
            let col = j;
  
            while (col > 0 && gameGrid[i][col - 1] === 0) {
              gameGrid[i][col - 1] = gameGrid[i][col];
              gameGrid[i][col] = 0;
              col--;
              moved = true;
            }
  
            if (col > 0 && gameGrid[i][col - 1] === gameGrid[i][col]) {
              gameGrid[i][col - 1] *= 2;
              gameGrid[i][col] = 0;
              score += gameGrid[i][col - 1];
              moved = true;
            }
          }
        }
      }
  
      return moved;
    }
  
    function moveRight() {
      let moved = false;
  
      for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
          if (gameGrid[i][j] !== 0) {
            let col = j;
  
            while (col < 3 && gameGrid[i][col + 1] === 0) {
              gameGrid[i][col + 1] = gameGrid[i][col];
              gameGrid[i][col] = 0;
              col++;
              moved = true;
            }
  
            if (col < 3 && gameGrid[i][col + 1] === gameGrid[i][col]) {
              gameGrid[i][col + 1] *= 2;
              gameGrid[i][col] = 0;
              score += gameGrid[i][col + 1];
              moved = true;
            }
          }
        }
      }
  
      return moved;
    }
  
    function moveUp() {
      let moved = false;
  
      for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
          if (gameGrid[i][j] !== 0) {
            let row = i;
  
            while (row > 0 && gameGrid[row - 1][j] === 0) {
              gameGrid[row - 1][j] = gameGrid[row][j];
              gameGrid[row][j] = 0;
              row--;
              moved = true;
            }
  
            if (row > 0 && gameGrid[row - 1][j] === gameGrid[row][j]) {
              gameGrid[row - 1][j] *= 2;
              gameGrid[row][j] = 0;
              score += gameGrid[row - 1][j];
              moved = true;
            }
          }
        }
      }
  
      return moved;
    }
  
    function moveDown() {
      let moved = false;
  
      for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
          if (gameGrid[i][j] !== 0) {
            let row = i;
  
            while (row < 3 && gameGrid[row + 1][j] === 0) {
              gameGrid[row + 1][j] = gameGrid[row][j];
              gameGrid[row][j] = 0;
              row++;
              moved = true;
            }
  
            if (row < 3 && gameGrid[row + 1][j] === gameGrid[row][j]) {
              gameGrid[row + 1][j] *= 2;
              gameGrid[row][j] = 0;
              score += gameGrid[row + 1][j];
              moved = true;
            }
          }
        }
      }
  
      return moved;
    }
  
    function isGameOver() {
      // check for empty cells
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (gameGrid[i][j] === 0) {
            return false; // empty cells present - then the game is not over
          }
  
          // cells check
          if (
            (i < 3 && gameGrid[i][j] === gameGrid[i + 1][j]) ||
            (j < 3 && gameGrid[i][j] === gameGrid[i][j + 1])
          ) {
            return false;
          }
        }
      }
  
      return true; // game over if there are no empty cells
    }
  
    function handleKeyPress(event) {
      if (event.key === "ArrowLeft") {
        move("left");
      } else if (event.key === "ArrowRight") {
        move("right");
      } else if (event.key === "ArrowUp") {
        move("up");
      } else if (event.key === "ArrowDown") {
        move("down");
      }
    }
  
    // Initialize the game
    initializeGrid();
    renderGrid();
  
    // Event listener for keyboard input
    document.addEventListener("keydown", handleKeyPress);
  
  });
  
  function restartGame(){
    window.location.reload();
}