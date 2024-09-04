import { setPage } from '../main'
import { updateScoreMisses } from "../utils/helpers"

export const initLose = (appNode, state) => {    
  const finalScore = appNode.querySelector('.final-score')
  finalScore.textContent = state.score
  const backToMain = () => {
    setPage('main')
    state.score = 0
    state.misses = 0
    updateScoreMisses(0, 0, 0)
}
  const continueSearch = () => {
    setPage('puzzle')
    state.score = 0
    state.misses = 0
    updateScoreMisses(0, 0, 0)
  }

  return { events: { continueSearch, backToMain } }
}
