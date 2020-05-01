'use strict'
import { controller } from './controller.js'
import { gameService } from './gameService.js'
import { viewHandler } from './viewHandler.js'
import { countdown } from './countdown.js'
import { Game } from './game.js'
import { exampleData } from './playerHandler.js'

function addEventListenerToButtonOptions () {
  let gameButtons = document.getElementsByClassName('game-option')
  Array.from(gameButtons).forEach(function (element) {
    element.addEventListener('click', chooseOption)
  })

  document.getElementById('stop-game').addEventListener('click', controller.stopGame)
}

async function chooseOption (e) {
  if (!controller.isChosen()) {
    controller.setChosen(true)
    let playerName = controller.getPlayerName()
    let game
    if (controller.isLocalGame()) {
      game = new Game(playerName, e.target.value)
    } else {
      let playResponseJson = await gameService.fetchGame(playerName, e.target.innerText)
      game = new Game(playerName, e.target.value, true, playResponseJson.choice, playResponseJson.win)
    }
    controller.setCurrentGame(game)
    controller.getCurrentMode().history.push(game)
    if (controller.isLocalGame()) {
      if (game.result !== 'tie') {
        exampleData[playerName][game.result]++
      }
    }
    viewHandler.gameViewInit()
    countdown.startTimer(3, e.target)
  }
}

export const gameView = {
  addEventListenerToButtonOptions
}