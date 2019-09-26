document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const width = 10
  const cells = []
  let snake = [12,11,10,9]
  let direction = 'right'
  const soundEffect = document.querySelector('audio')
  const scoreDisplay = document.querySelector('.score')
  let score = 0
  let speedSnake = 400
  const resetBtn = document.querySelector('button')
  document.querySelector('.dead')
  let timer

  //create a grid
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }

  function drawSnake() {
    snake.forEach(index => cells[index].classList.add('snake'))
  }

  // when snake hits its own tail it is killed
  function killSnake() {
    if (snake.slice(1).includes(snake[0])) {
      return gameOver()
    }
  }

  function eraseSnake() {
    snake.forEach(index => cells[index].classList.remove('snake'))
  }

  function apple() {
    let randomIndex = Math.floor(Math.random() * cells.length)
    while (cells[randomIndex].classList.contains('snake')) {
      randomIndex = Math.floor(Math.random() * cells.length)
    }
    cells[randomIndex].classList.add('apple')
  }

  function gameOver() {
    console.log('gameOver')
    eraseSnake()
    grid.classList.remove('grid')
    grid.classList.add('dead')
    soundEffect.src = 'sounds/Metal_Gong-Dianakc-109711828.mp3'
    soundEffect.play()
  }

  function moveSnake() {
    console.log(snake)
    if (snake[0] % width === 0 && direction === 'left' ||
        snake[0] % width === width - 1  && direction === 'right' ||
        snake[0] - width < 0  && direction === 'up' ||
        snake[0] >= width * (width - 1 )  && direction === 'down') {
      return gameOver()
    }
    eraseSnake()

    switch (direction){
      case 'right': moveSnakeRight()
        break
      case 'left': moveSnakeLeft()
        break
      case 'up': moveSnakeUp()
        break
      case 'down': moveSnakeDown()
    }
    killSnake()

    if (cells[snake[0]].classList.contains('apple')) {
      score ++
      speedSnake += 10
      console.log(speedSnake)
      cells[snake[0]].classList.remove('apple')
      snake.unshift(snake[0])
      scoreDisplay.innerText = score
      apple()
      soundEffect.src = 'sounds/Biting Apple-SoundBible.com-415478302.mp3'
      soundEffect.play()
    }

    drawSnake()

    timer = setTimeout(moveSnake, speedSnake)
  }
  moveSnake()

  function moveSnakeDown() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] + width)
    drawSnake()
  }

  function moveSnakeUp() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - width)
    drawSnake()
  }

  function moveSnakeLeft() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] - 1)
    drawSnake()
  }

  function moveSnakeRight() {
    eraseSnake()
    snake.pop()
    snake.unshift(snake[0] + 1)
    drawSnake()
  }

  document.addEventListener('keyup', (e) => {
    e.preventDefault()
    switch (e.keyCode) {
      case 37: if (direction !== 'right') direction = 'left'
        break
      case 38: if (direction !== 'down') direction = 'up'
        break
      case 39: if (direction !== 'left') direction = 'right'
        break
      case 40: if (direction !== 'up') direction = 'down'
        break
    }
  })

  resetBtn.addEventListener('click', () => {
    snake.forEach(index => cells[index].classList.remove('snake'))
    snake = [12,11,10,9]
    direction = 'right'
    clearTimeout(timer)
    grid.classList.remove('dead')
    grid.classList.add('grid')
    score = 0
    scoreDisplay.innerText = score
    drawSnake()
    moveSnake()
  })

  apple()

})




// First Attempt

// document.addEventListener('DOMContentLoaded', () => {
//   const width = 10
//   const grid = document.querySelector('.grid')
//   const cells = []
//   let snakeIdx = 12

//   for (let i = 0; i < width ** 2; i++) {
//     const cell = document.createElement('DIV')

//     cell.addEventListener('click', handleClick)

//     grid.appendChild(cell)
//     cells.push(cell)
//   }

//   function startGame() {
//     // Default position for the snake in the middle of the board.
//     snake = Math.floor(boardWidth / 2)
//     snakeLength = 5
//     snakeDirection = 'Up'

//     // Set the center of the board to contain a snake
//     board[snakeY][snakeX].snake = 1

//     // Clear the board
//     for (var y = 0; y < boardHeight; ++y) {
//       for (var x = 0; x < boardWidth; ++x) {
//         board[y][x].snake = 0;
//       }
//     }
//   }
//   cells[snakeIdx].classList.add('snake')

//   function gameLoop() {
//     // Loop over the entire board, and update every cell
//     for (var y = 0; y < boardHeight; ++y) {
//       for (var x = 0; x < boardWidth; ++x) {
//         var cell = board[y][x];

//         if (cell.snake) {
//           cell.element.className = 'snake'
//         } else {
//           cell.element.className = ''
//         }
//       }
//     }

//     // This function calls itself, with a timeout of 1000 milliseconds
//     setTimeout(gameLoop, 1000);
//   }

//   // Check for walls, and restart if we collide with any
//   if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
//     startGame()
//   }

//   // Update the board at the new snake position
//   board[snakeY][snakeX].snake = 1;

//   document.addEventListener('keyup', (e) => {

//     cells[snakeIdx].classList.remove('snake')
//     const x = snakeIdx % width
//     const y = Math.floor(snakeIdx / width)


//     switch (e.keyCode) {
//       case 37: if (x > 0) snakeIdx -= 1
//         break
//       case 38: if (y > 0) snakeIdx -= width
//         break
//       case 39: if (x < width - 1) snakeIdx += 1
//         break
//       case 40: if (y < width - 1) snakeIdx += width
//         break
//     }

//     cells[snakeIdx].classList.add('snake')
//   })