// Define the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the initial position and size of the snake
let snake = [{ x: 10, y: 10 }];
let snakeSize = 1;

// Set the initial position and size of the food
let food = { x: 5, y: 5 };

// Set the initial direction of the snake
let direction = 'right';

// Function to draw the snake on the canvas
function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }
}

// Function to draw the food on the canvas
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Function to update the game state
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;
  snake.unshift(head);

  // Check if the snake has collided with itself or the boundaries
  if (
    head.x < 0 ||
    head.x >= canvas.width / 20 ||
    head.y < 0 ||
    head.y >= canvas.height / 20 ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    // Game over
    alert('Game over!');
    snake = [{ x: 10, y: 10 }];
    snakeSize = 1;
    direction = 'right';
    food = { x: 5, y: 5 }; // Reset the food position
  }

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    // Increase the size of the snake
    snakeSize++;
    // Generate new food position
    food = {
      x: Math.floor(Math.random() * (canvas.width / 20)),
      y: Math.floor(Math.random() * (canvas.height / 20)),
    };
  } else {
    // Remove the tail segment if the snake hasn't eaten the food
    snake.pop();
  }

  // Draw the snake and the food
  drawSnake();
  drawFood();
}

// Function to handle keyboard input
function handleInput(event) {
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
}

// Set up the game loop
setInterval(update, 100);

// Add event listener for keyboard input
document.addEventListener('keydown', handleInput);
