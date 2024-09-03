export const  genPuzzle = (gridSize) => {
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




// export const genPuzzle = (gridSize) => {
//   const board = Array(gridSize)
//     .fill(null)
//     .map(() => Array(gridSize).fill(''))
//   const playerSelections = Array(gridSize)
//     .fill(null)
//     .map(() => Array(gridSize).fill(''))
//   const trees = []
//   const mountains = []

//   // Randomly place mountains
//   const numMountains = Math.floor(gridSize / 3) // Adjust this based on difficulty
//   for (let i = 0; i < numMountains; i++) {
//     let x, y
//     do {
//       x = Math.floor(Math.random() * gridSize)
//       y = Math.floor(Math.random() * gridSize)
//     } while (board[x][y] !== '') // Ensure mountain is placed on an empty cell

//     board[x][y] = 'mountain'
//     playerSelections[x][y] = 'mountain'
//     mountains.push([x, y])
//   }

//   // Randomly place trees
//   const baseTreeCount =
//     Math.floor(Math.random() * ((gridSize * gridSize) / 3)) + gridSize
//   const numTrees = gridSize >= 11 ? baseTreeCount + gridSize : baseTreeCount

//   for (let i = 0; i < numTrees; i++) {
//     let x, y
//     do {
//       x = Math.floor(Math.random() * gridSize)
//       y = Math.floor(Math.random() * gridSize)
//     } while (board[x][y] !== '') // Ensure tree is placed on an empty cell

//     board[x][y] = 'tree'
//     playerSelections[x][y] = 'tree'
//     trees.push([x, y])
//   }

//   // Place mushrooms adjacent to trees and not adjacent to mountains
//   trees.forEach(([x, y]) => {
//     const directions = [
//       [0, -1],
//       [-1, 0],
//       [1, 0],
//       [0, 1],
//     ]
//     for (let [dx, dy] of directions) {
//       const newX = x + dx
//       const newY = y + dy
//       if (
//         isInBounds(newX, newY, gridSize) &&
//         board[newX][newY] === '' &&
//         !isAdjacentTo(newX, newY, board, 'mountain')
//       ) {
//         if (Math.random() < 0.7) board[newX][newY] = 'mushroom'
//       }
//     }
//   })

//   // Place flowers in cells that do not touch trees or mountains
//   for (let x = 0; x < gridSize; x++) {
//     for (let y = 0; y < gridSize; y++) {
//       if (
//         board[x][y] === '' &&
//         canPlaceFlower(x, y, board, gridSize) &&
//         !isAdjacentTo(x, y, board, 'mountain')
//       ) {
//         if (Math.random() < 0.7) board[x][y] = 'flower'
//       }
//     }
//   }

//   return { playerSelections, board }
// }

// // Helper function to check if a cell is adjacent to a specific item (tree, mountain, etc.)
// function isAdjacentTo(x, y, board, item) {
//   const directions = [
//     [0, -1],
//     [-1, 0],
//     [1, 0],
//     [0, 1],
//   ]
//   for (let [dx, dy] of directions) {
//     const newX = x + dx
//     const newY = y + dy
//     if (isInBounds(newX, newY, board.length) && board[newX][newY] === item) {
//       return true
//     }
//   }
//   return false
// }

// // Helper function to check if a flower can be placed (it should not be adjacent to a tree or mountain)
// function canPlaceFlower(x, y, board, gridSize) {
//   const directions = [
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, -1],
//     [0, 1],
//     [1, -1],
//     [1, 0],
//     [1, 1],
//   ]
//   for (let [dx, dy] of directions) {
//     const newX = x + dx
//     const newY = y + dy
//     if (
//       isInBounds(newX, newY, gridSize) &&
//       (board[newX][newY] === 'tree' || board[newX][newY] === 'mountain')
//     ) {
//       return false
//     }
//   }
//   return true
// }

// // Helper function to check if coordinates are within bounds
// function isInBounds(x, y, gridSize) {
//   return x >= 0 && x < gridSize && y >= 0 && y < gridSize
// }



// export const genPuzzle = (gridSize) => {
//   const board = Array(gridSize)
//     .fill(null)
//     .map(() => Array(gridSize).fill(''))
//   const playerSelections = Array(gridSize)
//     .fill(null)
//     .map(() => Array(gridSize).fill(''))
//   const trees = []

//   // Randomly place trees
//   const baseTreeCount =
//     Math.floor(Math.random() * ((gridSize * gridSize) / 3)) + gridSize // Random number of trees based on grid size

//   // Higher levels add a couple more trees to make guessing flowers a little easier
//   const numTrees = gridSize >= 11 ? baseTreeCount + gridSize : baseTreeCount

//   for (let i = 0; i < numTrees; i++) {
//     let x, y
//     do {
//       x = Math.floor(Math.random() * gridSize)
//       y = Math.floor(Math.random() * gridSize)
//     } while (board[x][y] === 'tree')

//     board[x][y] = 'tree'
//     playerSelections[x][y] = 'tree'
//     trees.push([x, y])
//   }

//   // Place mushrooms adjacent to trees
//   trees.forEach(([x, y]) => {
//     const directions = [
//       [0, -1],
//       [-1, 0],
//       [1, 0],
//       [0, 1],
//     ]
//     for (let [dx, dy] of directions) {
//       const newX = x + dx
//       const newY = y + dy
//       if (isInBounds(newX, newY, gridSize) && board[newX][newY] === '') {
//         if (Math.random() < 0.7) board[newX][newY] = 'mushroom'
//       }
//     }
//   })

//   // Place flowers in cells that do not touch trees
//   for (let x = 0; x < gridSize; x++) {
//     for (let y = 0; y < gridSize; y++) {
//       if (board[x][y] === '' && canPlaceFlower(x, y, board, gridSize)) {
//         if (Math.random() < 0.7) board[x][y] = 'flower'
//       }
//     }
//   }

//   return { playerSelections, board }
// }

// // Helper function to check if a flower can be placed (it should not be adjacent to a tree)
// function canPlaceFlower(x, y, board, gridSize) {
//   const directions = [
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, -1],
//     [0, 1],
//     [1, -1],
//     [1, 0],
//     [1, 1],
//   ]
//   for (let [dx, dy] of directions) {
//     const newX = x + dx
//     const newY = y + dy
//     if (isInBounds(newX, newY, gridSize) && board[newX][newY] === 'tree') {
//       return false
//     }
//   }
//   return true
// }

// // Helper function to check if coordinates are within bounds
// function isInBounds(x, y, gridSize) {
//   return x >= 0 && x < gridSize && y >= 0 && y < gridSize
// }
