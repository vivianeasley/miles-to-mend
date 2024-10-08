import './style.css'
import { emojiToJpg } from './utils/emoji-to-jpg'
import { initState } from './utils/state'
import { initMain } from './pages/main'
import { initPuzzle } from './pages/puzzle'
import { initNext } from './pages/next'
import { getNode } from './utils/helpers'
import { emojis } from './utils/emojis'
import { initWin } from './pages/win'
import { initLose } from './pages/lose'
import { initScores } from './pages/scores'
const appNode = getNode('#app')
export const state = initState()
const imageDict = emojiToJpg(emojis)

state.images = imageDict
state.vWidth = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
)
state.vHeight = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
)
state.xOrigin = Math.floor(7000 / 2)
state.yOrigin = Math.floor(7000 / 2)

let currentPageEvents

function generateStars(num) {
  const starMoonNode = document.querySelector('.stars-moon')
  for (let i = 0; i < num; i++) {
    createStarNode(
      Math.random() * window.innerWidth,
      Math.random() * (window.innerHeight / 1.5),
      (Math.random() * 100) / 5,
      state.images['star3']
    )
  }
  createMoonNode(
    Math.random() * window.innerWidth,
    Math.random() * (window.innerHeight / 1.5),
    50,
    state.images['star4']
  )
  function createStarNode(x, y, size, img) {
    const star = document.createElement('div')
    star.classList.add('star')
    star.style.left = `${x}px`
    star.style.top = `${y}px`
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.backgroundImage = `url(${img})`
    star.style.animation = `twinkle ${Math.random() * 2 + 8}s infinite`
    starMoonNode.appendChild(star)
  }
  function createMoonNode(x, y, size, img) {
    const moon = document.createElement('div')
    moon.classList.add('moon')
    moon.style.left = `${x}px`
    moon.style.top = `${y}px`
    moon.style.width = `${size}px`
    moon.style.height = `${size}px`
    moon.style.backgroundImage = `url(${img})`
    starMoonNode.appendChild(moon)
  }
}

generateStars(20)

const pages = {
  main: {
    html: `
    <div class="general-container">
      <h2>Miles to Mend</h2>
      <h4>Goal: Find all mushrooms and flowers correctly over 10 levels without getting 13 incorrect answers.</h4>
      <p><button class="unstyled-button" data-event="play">Play</button> <button class="unstyled-button" data-event="playWithSound">Play With Sound</button> <button class="unstyled-button" data-event="scores">High Scores</button></p>
      <p><input type="checkbox" id="game-type" name="game-type" data-event="setGameType"> <label for="game-type">Add guessing (removes perfect information but scores more points each round)</label></p>
      <p>
      <h4>Rules:</h4>
      <p>
      <ul>
        <li>Collect your ingredients by selecting the ingredient tab (mushroom or flower) and clicking an empty square on the board.</li>
        <li>The numbers along the borders show how many mushrooms and flowers to include in each row and column. Bottom and right show how many mushrooms. Top and left show how many flowers.</li>
        <li>Flowers need sun: they must not be placed next to trees.</li>
        <li>Mushrooms need shade: they must be placed next to trees.</li>
        <li>Neither mushrooms or flowers grow in the mountains: they must not be placed next to a mounatin.</li>
        <li>To remove an ingredient from the board, click on it.</li>
        <li>When you've finished collecting, click a border number to score that row or column.</li>
        <li>When all spaces on the grid are scored, if you have fewer than 13 incorrect placements you progress to the next level.</li>
        <li>Beat 10 levels to win!</li>
      </ul>
      </p>
      <p class="story">
        In the dimming embrace of twilight, you wander through the shadowed woods, a young apothecary driven by a quiet desperation. The light fades faster than your hopes, casting long, mournful shadows over the earth. The leaves whisper secrets of the night as you search, your hands trembling as they sift through the undergrowth, seeking the elusive plants and fungi that may hold the cure. Time is slipping away, as relentless as the fever burning within your small, distant home. You know the night is closing in, and with it, the chance to save a life.
      </p>
      <p>© <a href="https://github.com/vivianeasley">Vivian Easley</a></p>
    </div>
    `,
    funct: initMain,
  },
  puzzle: {
    html: `
    <div class="puzzle-container"><canvas id="particleCanvas"></canvas><div id="game-board"></div></div>
    <div class="button-container"> 
      <button class="button unstyled-button" data-event="flowerButton"><img src="${state.images['flower3']}" class="button-image" /> Flower</button>
      <button class="button unstyled-button selected" data-event="mushroomButton"><img src="${state.images['mushroom']}" class="button-image" /> Mushroom</button>
    </div>`,
    funct: initPuzzle,
  },
  next: {
    html: `
    <div class="general-container">
      <h2>Continue your search?</h2>
      <p>Next Level: <span class="next-level"></span></p>
      <button class="continue unstyled-button" data-event="continueSearch">Continue</button>
    </div>
    `,
    funct: initNext,
  },
  win: {
    html: `
    <canvas id="particleCanvas"></canvas>
    <div class="general-container">
      <h2>You win</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <p class="story">You return just as the last flames flicker, mere whispers of light in the crumbling hearth. You want to collapse, to let the weight of it all crush you into the earth. With trembling, mud-caked hands, you stoke the dying embers, coaxing them back into life. You begin to mix the medicine so desperately needed to save someone dear to you. Time is slipping through your fingers, but there's still enough.</p>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>
    `,
    funct: initWin,
  },
  lose: {
    html: `
    <div class="general-container">
      <h2>You lose</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>`,
    funct: initLose,
  },
  scores: {
    html: `
    <div class="general-container">
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <h2>High Scores</h2>
      <p>
        <ol class="scores-list">
        </ol>
      </p>
    </div>`,
    funct: initScores,
  },
}

export function setPage(page) {
  state.page = page
  const pageObj = pages[page]
  appNode.innerHTML = pageObj.html
  setTimeout(() => {
    const obj = pageObj.funct(appNode, state)
    if (obj?.events) {
      currentPageEvents = obj.events
    }
  }, 0)
}

appNode.addEventListener('click', (event) => {
  if (currentPageEvents[event.target.dataset.event]) {
    const payload = event.target.dataset.payload
      ? event.target.dataset.payload
      : null
    currentPageEvents[event.target.dataset.event](event, payload)
  }
})

function updateFavicon(newHref) {
  const favicon = document.getElementById('favicon')
  if (favicon) {
    favicon.href = newHref
  }
}

updateFavicon(state.images['star4'])

setPage('main')

// Init images
function getImageDict() {
  return emojiToJpg(emojis)
}
