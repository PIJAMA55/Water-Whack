// Game configuration and state variables
const GOAL_CANS = 25;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;          // Holds the interval for spawning items

// Winning and losing messages
const winningMessages = [
  "Amazing! You brought clean water to the village!",
  "Victory! The community celebrates your effort!",
  "You did it! Every can counts for a better world!",
  "Champion! You made a real difference!",
  "Incredible! Water for everyone!"
];
const losingMessages = [
  "Try again! The village still needs more water.",
  "Almost there! Give it another shot!",
  "Don't give up! The community is counting on you!",
  "Keep going! Every can helps!",
  "So close! Try once more for clean water!"
];

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;
  currentCans = 0;
  document.getElementById("current-cans").innerHTML = currentCans;
  document.getElementById("achievements").innerHTML = "";
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second

  let timeLeft = 30;
  let timerDisplay = document.getElementById("timer");

  let countdown = setInterval(function() {
    timeLeft--;
    timerDisplay.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.innerHTML = "Time's up!";
      gameActive = false;
      clearInterval(spawnInterval);
      // Show win/lose message in modal
      const modal = document.getElementById("endgame-modal");
      const modalContent = document.getElementById("modal-content");
      let msg, color;
      if (currentCans >= 20) {
        msg = winningMessages[Math.floor(Math.random() * winningMessages.length)];
        color = '#4FCB53';
      } else {
        msg = losingMessages[Math.floor(Math.random() * losingMessages.length)];
        color = '#F5402C';
      }
      modalContent.innerHTML = `<span style='color:${color};font-weight:bold;'>${msg}</span>`;
      modal.style.display = "flex";
    }
  }, 1000); // runs every 1000 ms = 1 second
}

// Modal close button handler
const closeModalBtn = document.getElementById('close-modal');
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', function() {
    document.getElementById('endgame-modal').style.display = 'none';
  });
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);

document.querySelector('.game-grid').addEventListener('click', function(e) {
  if (e.target.classList.contains('water-can')) {
    currentCans++;
    document.getElementById("current-cans").innerHTML = currentCans;
  }
});


