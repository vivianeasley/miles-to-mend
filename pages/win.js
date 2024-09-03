import { setPage } from '../main'
import { initParticleEffect } from '../pages/particle-effect'
import { initScoreSound } from '../utils/sound'
import { updateScoreMisses } from '../utils/helpers'

export const initWin = (appNode, state) => {
  const backToMain = () => {
    setPage('main')
    clearTimeout(timeOutId)
    stopParticles()
    state.score = 0
    state.misses = 0
    updateScoreMisses(0, 0, 0)
  }
  const { playCoinClinkSound } = initScoreSound()
  const finalScore = appNode.querySelector('.final-score')
  finalScore.textContent = state.score
  let timeOutId

  const { initParticles, stopParticles, setCanvasSize } = initParticleEffect()
  setCanvasSize()

  function createStars() {
    for (let i = 0; i < 10; i++) {
      const star =
        Math.random() > 0.5 ? state.images['star'] : state.images['star2']
      initParticles(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        10,
        star
      )
    }
    if (state.sound) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          playCoinClinkSound()
        }, i * 100)
      }
    }
    timeOutId = setTimeout(createStars, 2000)
  }

  createStars()

  const continueSearch = () => {
    setPage('puzzle')
    clearTimeout(timeOutId)
    stopParticles()
    state.score = 0
    state.misses = 0
    updateScoreMisses(0, 0, 0)
  }

  return { events: { continueSearch, backToMain } }
}
