import { setPage } from '../main'
import { genPuzzle } from '../utils/gen-puzzle'
import { updateScoreMisses } from '../utils/helpers'
import { initParticleEffect } from '../pages/particle-effect'
import { initScoreSound } from '../utils/sound'

export const initPuzzle = (appNode, state) => {
  const scores = localStorage.getItem('scores')
  const { playCoinClinkSound } = initScoreSound()
  const { gridSize, images } = state
  const { playerSelections, board } = genPuzzle(gridSize)
  const { initParticles, stopParticles, setCanvasSize } = initParticleEffect()

  // Calculate the top, right, left, and bottom arrays
  function calculateCounts(board) {
    const top = Array(board[0].length).fill(0)
    const right = Array(board.length).fill(0)
    const left = Array(board.length).fill(0)
    const bottom = Array(board[0].length).fill(0)

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 'flower') {
          top[x]++
          left[y]++
        } else if (board[y][x] === 'mushroom') {
          bottom[x]++
          right[y]++
        }
      }
    }

    return { top, right, left, bottom }
  }

  const { top, right, left, bottom } = calculateCounts(board)

  // Function to create the grid layout in HTML
  function renderBoard() {
    updateScoreMisses(state.score, state.misses)

    const gameBoard = appNode.querySelector('#game-board')

    if (!gameBoard) return
    // Set the grid template for a 7x7 grid (including headers)
    gameBoard.style.gridTemplateColumns = `50px repeat(${board[0].length}, 50px) 50px`
    gameBoard.style.gridTemplateRows = `50px repeat(${board.length}, 50px) 50px`

    // Clear the current grid
    gameBoard.innerHTML = ''

    // Create the grid with header cells
    for (let y = -1; y <= board.length; y++) {
      for (let x = -1; x <= board[0].length; x++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        if (state.lockedY.includes(x + '') || state.lockedX.includes(y + ''))
          cell.classList.add('disabled')
        if (state.correct.some((pair) => pair[0] === y && pair[1] === x))
          cell.classList.add('correct')
        if (state.incorrect.some((pair) => pair[0] === y && pair[1] === x))
          cell.classList.add('incorrect')

        if (x === -1 && y === -1) {
          const cornerImg = document.createElement('img')
          cornerImg.src = images['flower3']
          cornerImg.classList.add('tile-image')
          cell.appendChild(cornerImg)
        } else if (x === board[0].length && y === board.length) {
          const cornerImg = document.createElement('img')
          cornerImg.src = images['mushroom']
          cornerImg.classList.add('tile-image')
          cell.appendChild(cornerImg)
        } else if (x === board[0].length && y === -1) {
          cell.classList.add('clear-cell')
        } else if (x === -1 && y === board.length) {
          cell.classList.add('clear-cell')
        } else if (y === -1 && x >= 0 && x < board[0].length) {
          cell.classList.add('header-cell')
          cell.dataset.event = 'headerCellClick'
          cell.dataset.payload = `x--${x}`
          cell.textContent = top[x] // Top counts
        } else if (x === -1 && y >= 0 && y < board.length) {
          cell.classList.add('header-cell')
          cell.dataset.event = 'headerCellClick'
          cell.dataset.payload = `y--${y}`
          cell.textContent = left[y] // Left counts
        } else if (x === board[0].length && y >= 0 && y < board.length) {
          cell.classList.add('header-cell')
          cell.dataset.event = 'headerCellClick'
          cell.dataset.payload = `y--${y}`
          cell.textContent = right[y] // Right counts
        } else if (y === board.length && x >= 0 && x < board[0].length) {
          cell.classList.add('header-cell')
          cell.dataset.event = 'headerCellClick'
          cell.dataset.payload = `x--${x}`
          cell.textContent = bottom[x] // Bottom counts
        } else if (
          x >= 0 &&
          x < board[0].length &&
          y >= 0 &&
          y < board.length
        ) {
          cell.setAttribute('data-x', x)
          cell.setAttribute('data-y', y)
          cell.dataset.event = 'cellClick'

          // Populate the grid with predefined items (trees)
          const img = document.createElement('img')
          if (board[y][x] === 'tree') {
            img.src = images['tree2']
            img.classList.add('tile-image')
            cell.appendChild(img)
            cell.dataset.type = 'tree'
          } else if (playerSelections[y][x] === 'flower') {
            img.src = images['flower3']
            img.classList.add('tile-image')
            cell.appendChild(img)
            cell.dataset.type = 'flower'
          } else if (playerSelections[y][x] === 'mushroom') {
            img.src = images['mushroom']
            img.classList.add('tile-image')
            cell.appendChild(img)
            cell.dataset.type = 'mushroom'
          }
        }

        gameBoard.appendChild(cell)
      }
    }
    setCanvasSize(gameBoard.offsetWidth, gameBoard.offsetHeight)
  }

  // Handle cell clicks for placing/removing items
  const cellClick = (event) => {
    const x = parseInt(event.target.getAttribute('data-x'))
    const y = parseInt(event.target.getAttribute('data-y'))

    // Remove item if clicked again
    if (
      playerSelections[y][x] === 'flower' ||
      playerSelections[y][x] === 'mushroom'
    ) {
      playerSelections[y][x] = ''
    } else if (state.selectedType && board[y][x] !== 'tree') {
      playerSelections[y][x] = state.selectedType
    }

    // Re-render the board to reflect changes
    renderBoard()
  }

  // Set up event listeners for the buttons
  const flowerButton = () => {
    state.selectedType = 'flower'
    appNode.querySelector('.button.selected').classList.remove('selected')
    appNode
      .querySelector(".button[data-event='flowerButton']")
      .classList.add('selected')
  }

  const mushroomButton = () => {
    state.selectedType = 'mushroom'
    appNode.querySelector('.button.selected').classList.remove('selected')
    appNode
      .querySelector(".button[data-event='mushroomButton']")
      .classList.add('selected')
  }

  // Handle submit button click
  const headerCellClick = (event, payload) => {
    const [axis, index] = payload.split('--')

    const { correct, incorrect } = countDifferences(
      playerSelections,
      board,
      axis === 'x' ? 'y' : 'x',
      parseInt(index)
    )

    if (axis === 'y' && !state.lockedX.includes(index)) {
      state.lockedX.push(index)
    }
    if (axis === 'x' && !state.lockedY.includes(index)) {
      state.lockedY.push(index)
    }

    state.misses += incorrect
    state.score += correct

    // if lose, add score to scores
    if (state.misses >= 13) {
      state.gridSize = 4
      state.lockedX = []
      state.lockedY = []
      state.correct = []
      state.incorrect = []
      stopParticles()
      setPage('lose')
      saveScore()
      state.score = 0
      state.misses = 0
      state.selectedType = 'mushroom'
      updateScoreMisses(state.score, state.misses)
    }

    // if win, add score to scores
    if (
      (state.lockedX.length === board.length ||
        state.lockedY.length === board[0].length) &&
      state.gridSize === 13 &&
      state.misses < 13
    ) {
      state.gridSize = 4
      state.lockedX = []
      state.lockedY = []
      state.correct = []
      state.incorrect = []
      state.selectedType = 'mushroom'
      saveScore()
      stopParticles()
      setPage('win')
    }

    // if beat level, increase level
    if (
      state.lockedX.length === board.length ||
      (state.lockedY.length === board[0].length && state.misses < 13)
    ) {
      state.gridSize++
      state.lockedX = []
      state.lockedY = []
      state.correct = []
      state.incorrect = []
      state.selectedType = 'mushroom'
      stopParticles()
      setPage('next')
    }

    renderBoard()

    function saveScore() {
      const scoresArray = scores ? JSON.parse(scores) : []
      const scoresUpdated = [...scoresArray, state.score]
      localStorage.setItem('scores', JSON.stringify(scoresUpdated))
    }
  }

  function countDifferences(playerSelections, board, axis, index) {
    let correct = 0
    let incorrect = 0

    if (axis === 'x') {
      // Count differences for a row
      for (let x = 0; x < board[0].length; x++) {
        // skip if
        if (state.lockedY.includes(x.toString())) continue

        if (playerSelections[index][x] === board[index][x]) {
          if (
            playerSelections[index][x] === 'flower' ||
            playerSelections[index][x] === 'mushroom'
          ) {
            correct++

            state.correct.push([index, x])
            setTimeout(() => {
              initParticles(x * 60 + 60, index * 60 + 60, 100, images['star'])
              if (state.sound) {
                playCoinClinkSound()
              }
            }, x * 50)
          }
        } else if (
          playerSelections[index][x] === 'flower' ||
          playerSelections[index][x] === 'mushroom' ||
          playerSelections[index][x] === ''
        ) {
          setTimeout(() => {
            initParticles(x * 60 + 60, index * 60 + 60, 100, images['fail'])
          }, x * 30)
          state.incorrect.push([index, x])
          incorrect++
        }
      }
    } else if (axis === 'y') {
      // Count differences for a column
      for (let y = 0; y < board.length; y++) {
        // skip if locked
        if (state.lockedX.includes(y.toString())) continue

        if (playerSelections[y][index] === board[y][index]) {
          if (
            playerSelections[y][index] === 'flower' ||
            playerSelections[y][index] === 'mushroom'
          ) {
            correct++

            state.correct.push([y, index])
            setTimeout(() => {
              initParticles(index * 60 + 60, y * 60 + 60, 100, images['star'])
              if (state.sound) {
                playCoinClinkSound()
              }
            }, y * 50)
          }
        } else if (
          playerSelections[y][index] === 'flower' ||
          playerSelections[y][index] === 'mushroom' ||
          playerSelections[y][index] === ''
        ) {
          setTimeout(() => {
            initParticles(index * 60 + 60, y * 60 + 60, 100, images['fail'])
          }, y * 50)
          state.incorrect.push([y, index])
          incorrect++
        }
      }
    }

    return { correct, incorrect }
  }

  renderBoard()

  return {
    events: { flowerButton, mushroomButton, headerCellClick, cellClick },
  }
}
