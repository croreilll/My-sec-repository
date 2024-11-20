let score = 0;
let currentLevel = 1;

const startButton = document.getElementById("start-button");
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score-value");
const levelInfo = document.getElementById("level-info");
const gameContent = document.getElementById("game-content");

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display = 'none';
  startLevel(currentLevel);
}

function startLevel(level) {
  levelInfo.innerHTML = `Level ${level}: Solve the Puzzle!`;
  gameContent.innerHTML = '';
  
  if (level === 1) {
    // Memory puzzle for Level 1
    memoryPuzzle();
  } else if (level === 2) {
    // Navigation and Obstacles for Level 2
    navigationChallenge();
  } else {
    gameOver();
  }
}

function memoryPuzzle() {
  const symbols = ['🍄', '🌳', '🍄', '🌟', '🌟', '🌳'];
  let tiles = symbols.slice();
  tiles = shuffle(tiles);
  let clickedTiles = [];

  // Display memory puzzle
  gameContent.innerHTML = tiles.map((tile, index) => 
    `<div class="tile" data-index="${index}">${tile}</div>`
  ).join('');

  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      clickedTiles.push(tile.innerHTML);
      tile.style.backgroundColor = '#a5d6a7';
      if (clickedTiles.length === 2) {
        if (clickedTiles[0] === clickedTiles[1]) {
          score += 10;
          scoreDisplay.textContent = score;
          setTimeout(() => startLevel(2), 1000);
        } else {
          score -= 5;
          scoreDisplay.textContent = score;
        }
        clickedTiles = [];
      }
    });
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function navigationChallenge() {
  // Simple navigation example (expandable)
  gameContent.innerHTML = '<p>Navigate through the forest and avoid obstacles!</p>';
  // Add movement and obstacles logic here
}

function gameOver() {
  alert("Game Over! Your score: " + score);
  location.reload();
}