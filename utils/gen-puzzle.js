export const genPuzzle = (gridSize) => {
  const board = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''))
  const playerSelections = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''))
  const trees = []

  // Randomly place trees
  const baseTreeCount =
    Math.floor(Math.random() * ((gridSize * gridSize) / 3)) + gridSize // Random number of trees based on grid size

  // Higher levels add a couple more trees to make guessing flowers a little easier
  const numTrees = gridSize >= 11 ? baseTreeCount + gridSize : baseTreeCount

  for (let i = 0; i < numTrees; i++) {
    let x, y
    do {
      x = Math.floor(Math.random() * gridSize)
      y = Math.floor(Math.random() * gridSize)
    } while (board[x][y] === 'tree')

    board[x][y] = 'tree'
    playerSelections[x][y] = 'tree'
    trees.push([x, y])
  }

  // Place mushrooms adjacent to trees
  trees.forEach(([x, y]) => {
    const directions = [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ]
    for (let [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy
      if (isInBounds(newX, newY, gridSize) && board[newX][newY] === '') {
        if (Math.random() < 0.7) board[newX][newY] = 'mushroom'
      }
    }
  })

  // Place flowers in cells that do not touch trees
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (board[x][y] === '' && canPlaceFlower(x, y, board, gridSize)) {
        if (Math.random() < 0.7) board[x][y] = 'flower'
      }
    }
  }

  return { playerSelections, board }
}

// Helper function to check if a flower can be placed (it should not be adjacent to a tree)
function canPlaceFlower(x, y, board, gridSize) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  for (let [dx, dy] of directions) {
    const newX = x + dx
    const newY = y + dy
    if (isInBounds(newX, newY, gridSize) && board[newX][newY] === 'tree') {
      return false
    }
  }
  return true
}

// Helper function to check if coordinates are within bounds
function isInBounds(x, y, gridSize) {
  return x >= 0 && x < gridSize && y >= 0 && y < gridSize
}
