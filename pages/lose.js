import { setPage } from '../main'

export const initLose = () => {
  const backToMain = () => setPage('main')
  const continueSearch = () => setPage('puzzle')

  return { events: { continueSearch, backToMain } }
}
