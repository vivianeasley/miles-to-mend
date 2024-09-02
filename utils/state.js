export const initState = () => {
  return {
    sound: false,
    flowers: 0,
    mushrooms: 0,
    turn: 0,
    misses: 0,
    score: 0,
    page: 'main',
    mapPopulated: false,
    gridSize: 4,
    selectedType: 'mushroom',
    lockedX: [],
    lockedY: [],
    correct: [],
    incorrect: [],
  }
}
