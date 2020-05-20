'use strict'
import { controller } from './controller.js'
import { gameService } from './gameService.js'
import { viewHandler } from './viewHandler.js'
import { countdown } from './countdown.js'

async function chooseOption (e) {
  if (!controller.isChosen()) {
    controller.setChosen(true)
    let playerName = controller.getPlayerName()
    let game = await gameService.fetchGame(playerName, e.target.value, e.target.innerText)
    controller.setCurrentGame(game)
    viewHandler.gameViewInit()
    countdown.startTimer(3, e.target)
  }
}

export const gameView = {
  chooseOption
}