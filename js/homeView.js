'use strict'
import { controller } from './controller.js'
import { gameService } from './gameService.js'
import { viewHandler } from './viewHandler.js'
import { playerHandler } from './playerHandler.js'

async function loadRanking () {
  viewHandler.homeViewInit()
  if (controller.isLocalGame()) {
    playerHandler.setPlayers(playerHandler.sortPlayers())
  } else {
    playerHandler.setPlayers(playerHandler.sortPlayers(await gameService.fetchPlayers()))
  }
  viewHandler.rankingView()
}

function switchMode (e) {
  let mode
  if (controller.isLocalGame()) {
    mode = 'server'
  } else {
    mode = 'local'
  }
  controller.setMode(mode)
  loadRanking()
}

function addEventListenerToButtons () {
  let button
  if (controller.isLocalGame()) {
    button = document.getElementById('server-button')
  } else {
    button = document.getElementById('local-button')
  }
  button.addEventListener('click', switchMode)

  document.getElementById('player-form').addEventListener('submit', controller.initGame)
}

export const homeView = {
  loadRanking,
  addEventListenerToButtons
}