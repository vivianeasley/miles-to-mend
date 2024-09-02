import { setPage } from '../main'

export const initMain = (appNode, state) => {
  const play = () => setPage('puzzle')

  const playWithSound = () => {
    state.sound = true
    setPage('puzzle')
  }

  const scores = () => {
    setPage('scores')
  }

  return { events: { play, playWithSound, scores } }
}
