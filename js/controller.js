'use strict'

import { countdown } from './countdown.js'
import { viewHandler } from './viewHandler.js'
import { homeView } from './homeView.js'
import { symbolDefinitions } from './gameData.js'
import { exampleData } from './playerHandler.js'

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

function getDataForHandlebars () {
  return {
    history: getCurrentMode().history,
    mode,
    playerName,
    currentGame,
    symbolDefinitions: symbolDefinitions,
    time: countdown.getCurrentTime()
  }
}

function initGame () {
  let potPlayerName = document.forms['player-form']['name'].value
  playerName = potPlayerName
  view = 'game'
  if (isLocalGame() && !doesPlayerExist(potPlayerName)) {
    exampleData[potPlayerName] = {win: 0, lost: 0, user: potPlayerName}
  }
  viewHandler.gameViewInit()
}

function isLocalGame () {
  return mode === 'local'
}

function doesPlayerExist (playerName) {
  return !!exampleData[playerName]
}

function stopGame () {
  countdown.clearTimer()
  viewHandler.homeViewInit()
  homeView.loadRanking()
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

export const controller = {
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
