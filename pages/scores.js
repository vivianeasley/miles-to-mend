import { setPage } from '../main'

export const initScores = () => {
  document.querySelector('.stats-container').style.display = 'none'

  const backToMain = () => setPage('main')
  const scores = localStorage.getItem('scores')
  const scoreArray = JSON.parse(scores)
  const sortedScores = scoreArray
    ? [...new Set(scoreArray)].sort((a, b) => b - a)
    : []
  document.querySelector('.scores-list').innerHTML = sortedScores
    .map((score) => `<li><h3>${score}</h3></li>`)
    .join('')

  return { events: { backToMain } }
}
