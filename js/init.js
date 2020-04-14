window.rockPaperScissors = window.rockPaperScissors || init()

function init () {
  return {
    server: {
      history: []
    },
    local: {
      history: []
    },
    view: 'board',
    mode: 'local',
    playerName: ''
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  rankingView()
})

function initGame () {
  let potPlayerName = document.forms['playerForm']['name'].value
  if (potPlayerName === '') {
    alert('Name must be filled out')
    return false
  }
  rockPaperScissors.playerName = potPlayerName
  rockPaperScissors.view = 'game'
  if (isLocalGame() && !doesPlayerExist(potPlayerName)) {
    rockPaperScissors.exampleData[potPlayerName] = {win: 0, lost: 0, user: potPlayerName}
  }
  gameView()
}

function isLocalGame () {
  return rockPaperScissors.mode === 'local'
}

function doesPlayerExist (playerName) {
  return !!rockPaperScissors.exampleData[playerName]
}

function rankingView () {
  const playerFragmentTemplateSource = document.getElementById('home-template').innerHTML
  const createPlayerFragmentHtmlString = Handlebars.compile(playerFragmentTemplateSource)
  document.getElementById('main').innerHTML = createPlayerFragmentHtmlString(rockPaperScissors)

  addEventListenerToModeButton()
}

function gameView () {
  const gameFragmentTemplateSource = document.getElementById('game-template').innerHTML
  const gameFragmentHtmlString = Handlebars.compile(gameFragmentTemplateSource)
  document.getElementById('main').innerHTML = gameFragmentHtmlString(rockPaperScissors)

  addEventListenerToButtonOptions()
}

function addEventListenerToModeButton () {
  let button
  if (isLocalGame()) {
    button = document.getElementById('server-button')
  } else {
    button = document.getElementById('local-button')
  }
  button.addEventListener('click', switchMode)
}

function switchMode (e) {
  if (isLocalGame()) {
    rockPaperScissors.mode = 'server'
  } else {
    rockPaperScissors.mode = 'local'
  }
  loadRanking()
}

async function loadRanking () {
  if (isLocalGame()) {
    rockPaperScissors.players = rockPaperScissors.exampleData
  } else {
    let playerResponse = await fetch('https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking')
    if (playerResponse.ok) {
      rockPaperScissors.players = await playerResponse.json()
    }
  }
  sortPlayers()
  rankingView()
}

function addEventListenerToButtonOptions () {
  let gameButtons = document.getElementsByClassName('game-option')
  Array.from(gameButtons).forEach(function (element) {
    element.addEventListener('click', chooseOption)
  })
}

async function chooseOption (e) {
  if (!rockPaperScissors.currentGame) {
    if (isLocalGame()) {
      rockPaperScissors.currentGame = new Game(rockPaperScissors.playerName, e.target.value)
    } else {
      let playResponse = await fetch(
        `https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/play?playerName=${rockPaperScissors.playerName}&playerHand=${e.target.innerText}`)
      if (playResponse.ok) {
        let playResponseJson = await playResponse.json()
        rockPaperScissors.currentGame = new Game(rockPaperScissors.playerName, e.target.value, true, playResponseJson.choice, playResponseJson.win)
      }
    }
    rockPaperScissors[rockPaperScissors.mode].history.push(rockPaperScissors.currentGame)
    if (rockPaperScissors.currentGame.result !== 'tie') {
      rockPaperScissors.exampleData[rockPaperScissors.playerName][rockPaperScissors.currentGame.result]++
    }
    gameView()
    startTimer(3, e.target)
  }
}

function stopGame () {
  clearTimer()
  rankingView()
  loadRanking()
}