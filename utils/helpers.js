export const getNode = (target) => document.querySelector(target)

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

export function updateScoreMisses(score, misses, level) {
  const scoreElement = getNode('.stats-value.score')
  const levelElement = getNode('.stats-value.level')
  const missesElement = getNode('.stats-value.misses')
  scoreElement.textContent = score
  missesElement.textContent = misses
  levelElement.textContent = level
}
