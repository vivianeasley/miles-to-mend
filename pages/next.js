import { setPage } from '../main'

export const initNext = (appNode, state) => {
  const continueSearch = () => setPage('puzzle')

  const nextLevel = document.querySelector('.next-level')
  nextLevel.textContent = state.gridSize - 3

  return { events: { continueSearch } }
}
