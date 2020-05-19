'use strict'
import { viewHandler } from './viewHandler.js'
import { homeView } from './homeView.js'
import { controller } from './controller.js'
import { gameView } from './gameView.js'

document.addEventListener('DOMContentLoaded', function (event) {
  viewHandler.homeViewInit()
  viewHandler.rankingView()

  document.addEventListener('click', function (e) {
    let targetElement = e.target
    let changeModeButton = '#change-mode-button'
    let gameOptionButtons = '.game-option'
    let stopGameButton = '#stop-game'
    if (targetElement.matches(changeModeButton)) {
      homeView.switchMode(e)
    } else if (targetElement.matches(gameOptionButtons)) {
      gameView.chooseOption(e)
    } else if (targetElement.matches(stopGameButton)) {
      controller.stopGame(e)
    }
  })

  document.addEventListener('submit', function (e) {
    let targetElement = e.target
    let playerForm = '#player-form'
    if (targetElement.matches(playerForm)) {
      controller.initGame()
    }
  })
})
