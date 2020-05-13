'use strict'
import { controller } from './controller.js'
import { gameService } from './gameService.js'
import { viewHandler } from './viewHandler.js'
import { playerHandler } from './playerHandler.js'

async function loadRanking () {
  viewHandler.homeViewInit()
  playerHandler.setPlayers(playerHandler.sortPlayers(await gameService.fetchPlayers()))
  viewHandler.rankingView()
}

function switchMode (e) {
  let mode = controller.getInvertedModeLabel()
  controller.setMode(mode)
  loadRanking()
}

function addEventListenerToButtons () {
  let button
  button = document.getElementById(controller.getInvertedModeLabel() + '-button')
  button.addEventListener('click', switchMode)

  document.getElementById('player-form').addEventListener('submit', controller.initGame)
}

export const homeView = {
  loadRanking,
  addEventListenerToButtons
}