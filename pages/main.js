import { setPage } from '../main'

export const initMain = (appNode, state) => {
  document.querySelector('.stats-container').style.display = 'none'
  const play = () => setPage('puzzle')

  const playWithSound = () => {
    state.sound = true
    setPage('puzzle')
  }

  const scores = () => {
    setPage('scores')
  }

  // handle checkbox
  const gameTypeCheckbox = appNode.querySelector('#game-type')
  if (state.gameType === 'guessing') {
    gameTypeCheckbox.checked = true
  } else {
    gameTypeCheckbox.checked = false
  }

  const setGameType = (event) => {
    if (event.target.checked) {
      state.gameType = 'guessing'
    } else {
      state.gameType = 'puzzle'
    }
  }

  return { events: { play, playWithSound, scores, setGameType } }
}
