'use strict'
window.rockPaperScissors.homeView = (function () {
  async function loadRanking () {
    rockPaperScissors.viewHandler.homeView()
    if (rockPaperScissors.controller.isLocalGame()) {
      rockPaperScissors.players = rockPaperScissors.exampleData
    } else {
      let playerResponse = await fetch('https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking')
      if (playerResponse.ok) {
        rockPaperScissors.players = await playerResponse.json()
      }
    }
    rockPaperScissors.playerHandler.sortPlayers()
    rockPaperScissors.viewHandler.rankingView()
  }

  function switchMode (e) {
    let mode
    if (rockPaperScissors.controller.isLocalGame()) {
      mode = 'server'
    } else {
      mode = 'local'
    }
    rockPaperScissors.controller.setMode(mode)
    loadRanking()
  }

  function addEventListenerToButtons () {
    let button
    if (rockPaperScissors.controller.isLocalGame()) {
      button = document.getElementById('server-button')
    } else {
      button = document.getElementById('local-button')
    }
    button.addEventListener('click', switchMode)

    document.getElementById('player-form').addEventListener('submit', rockPaperScissors.controller.initGame)
  }

  return {
    loadRanking,
    addEventListenerToButtons
  }
})()