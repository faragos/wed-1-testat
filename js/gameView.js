'use strict'
window.rockPaperScissors.gameView = window.rockPaperScissors.gameView || (function () {
  function addEventListenerToButtonOptions () {
    let gameButtons = document.getElementsByClassName('game-option')
    Array.from(gameButtons).forEach(function (element) {
      element.addEventListener('click', chooseOption)
    })

    document.getElementById('stop-game').addEventListener('click', rockPaperScissors.controller.stopGame)
  }

  async function chooseOption (e) {
    if (!rockPaperScissors.controller.isChosen()) {
      rockPaperScissors.controller.setChosen(true)
      let playerName = rockPaperScissors.controller.getPlayerName()
      let game
      if (rockPaperScissors.controller.isLocalGame()) {
        game = new Game(playerName, e.target.value)
      } else {
        let playResponseJson = await rockPaperScissors.gameService.fetchGame(playerName, e.target.innerText)
        game = new Game(playerName, e.target.value, true, playResponseJson.choice, playResponseJson.win)
      }
      rockPaperScissors.controller.setCurrentGame(game)
      rockPaperScissors.controller.getCurrentMode().history.push(game)
      if (rockPaperScissors.controller.isLocalGame()) {
        if (game.result !== 'tie') {
          rockPaperScissors.exampleData[playerName][game.result]++
        }
      }
      rockPaperScissors.viewHandler.gameView()
      rockPaperScissors.countdown.startTimer(3, e.target)
    }
  }

  return {
    addEventListenerToButtonOptions
  }
})()