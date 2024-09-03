let mushroomLocations = [];

export const  genPuzzle = (gridSize, state) => {
  mushroomLocations = [];
  const board = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''));
  const playerSelections = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''));
  const trees = [];
  const mountains = [];

  // Place mountains first
  placeMountains(board, mountains, gridSize);

  // Place trees in a way that allows enough space for mushrooms and flowers
  placeTrees(board, trees, gridSize);

  // Place mushrooms logically adjacent to trees and away from mountains
  placeMushrooms(board, trees, gridSize);

  // Place flowers logically in valid positions
  placeFlowers(board, gridSize);


  // randomly remove 1 to 2 mushrooms if gameType is guessing
  if (state.gameType === 'guessing') {
    const numMushroomsToRemove = Math.floor(gridSize/2) - 1;
    for (let i = 0; i < numMushroomsToRemove; i++) {
      const randomIndex = Math.floor(Math.random() * mushroomLocations.length);
      const [randomY, randomX] = mushroomLocations[randomIndex];
      board[randomY][randomX] = "";
    }
  }
  
  return { playerSelections, board };
}

function placeMountains(board, mountains, gridSize) {
  const numMountains = Math.floor(gridSize / 3); // Adjust based on difficulty
  for (let i = 0; i < numMountains; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize);
      y = Math.floor(Math.random() * gridSize);
    } while (board[y][x] !== ''); // Ensure mountain is placed on an empty cell

    board[y][x] = 'mountain';
    mountains.push([x, y]);
  }
}

function placeTrees(board, trees, gridSize) {
  const baseTreeCount = Math.floor(gridSize * gridSize * 0.2); // About 20% of the grid
  let placedTrees = 0;

  while (placedTrees < baseTreeCount) {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize);
      y = Math.floor(Math.random() * gridSize);
    } while (board[y][x] !== '' || !canPlaceTree(x, y, board, gridSize)); // Ensure valid tree placement

    board[y][x] = 'tree';
    trees.push([x, y]);
    placedTrees++;
  }
}

function placeMushrooms(board, trees, gridSize) {
  trees.forEach(([x, y]) => {
    const directions = [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ];

    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (
        isInBounds(newX, newY, gridSize) &&
        board[newY][newX] === '' &&
        !isAdjacentTo(newX, newY, board, 'mountain')
      ) {
        mushroomLocations.push([newY, newX]);
        board[newY][newX] = 'mushroom';
      }
    });
  });
}

function placeFlowers(board, gridSize) {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (
        board[y][x] === '' &&
        canPlaceFlower(x, y, board, gridSize)
      ) {
        board[y][x] = 'flower';
      }
    }
  }
}

// Helper function to check if a tree can be placed at (x, y)
function canPlaceTree(x, y, board, gridSize) {
  // Trees must not be placed adjacent to another tree
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (
      isInBounds(newX, newY, gridSize) &&
      board[newY][newX] === 'tree'
    ) {
      return false;
    }
  }
  return true;
}

// Helper function to check if a flower can be placed (not adjacent to tree or mountain)
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
  ];
  for (let [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (
      isInBounds(newX, newY, gridSize) &&
      (board[newY][newX] === 'tree' || board[newY][newX] === 'mountain')
    ) {
      return false;
    }
  }
  return true;
}

// Helper function to check if a cell is adjacent to a specific item (tree, mountain, etc.)
function isAdjacentTo(x, y, board, item) {
  const directions = [
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
  ];
  for (let [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (isInBounds(newX, newY, board.length) && board[newY][newX] === item) {
      return true;
    }
  }
  return false;
}

// Helper function to check if coordinates are within bounds
function isInBounds(x, y, gridSize) {
  return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}
