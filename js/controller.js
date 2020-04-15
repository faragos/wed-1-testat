window.rockPaperScissors.controller = (function () {
  let server = {
    history: []
  }
  let local = {
    history: []
  }
  let view = 'board'
  let mode = 'local'
  let playerName = ''
  let currentGame
  let chosen = false

  document.addEventListener('DOMContentLoaded', function (event) {
    rockPaperScissors.viewHandler.homeView()
    rockPaperScissors.viewHandler.rankingView()
  })

  function getDataForHandlebars () {
    return {
      server,
      local,
      view,
      mode,
      playerName,
      currentGame,
      symbolDefinitions: rockPaperScissors.symbolDefinitions,
      time: rockPaperScissors.countdown.getCurrentTime
    }
  }

  function initGame () {
    let potPlayerName = document.forms['player-form']['name'].value
    playerName = potPlayerName
    view = 'game'
    if (isLocalGame() && !doesPlayerExist(potPlayerName)) {
      rockPaperScissors.exampleData[potPlayerName] = {win: 0, lost: 0, user: potPlayerName}
    }
    rockPaperScissors.viewHandler.gameView()
  }

  function isLocalGame () {
    return mode === 'local'
  }

  function doesPlayerExist (playerName) {
    return !!rockPaperScissors.exampleData[playerName]
  }

  function stopGame () {
    rockPaperScissors.countdown.clearTimer()
    rockPaperScissors.viewHandler.homeView()
    rockPaperScissors.homeView.loadRanking()
  }

  function getCurrentMode () {
    return isLocalGame() ? local : server
  }

  function setMode (newMode) {
    mode = newMode
  }

  function getCurrentGame () {
    return currentGame
  }

  function setCurrentGame (currGame) {
    currentGame = currGame
  }

  function resetOption () {
    currentGame = null
    chosen = false
  }

  function isChosen () {
    return chosen
  }

  function setChosen (cho) {
    chosen = cho
  }

  function getPlayerName () {
    return playerName
  }

  return {
    initGame,
    stopGame,
    getDataForHandlebars,
    getCurrentGame,
    setCurrentGame,
    resetOption,
    isChosen,
    setChosen,
    isLocalGame,
    setMode,
    getCurrentMode,
    getPlayerName
  }
})()