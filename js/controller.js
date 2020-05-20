'use strict'

import { countdown } from './countdown.js'
import { viewHandler } from './viewHandler.js'
import { homeView } from './homeView.js'
import { symbolDefinitions } from './gameData.js'

let server = {
  history: []
}
let local = {
  history: []
}
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
  playerName = document.forms['player-form']['name'].value
  viewHandler.gameViewInit()
}

function isLocalGame () {
  return mode === 'local'
}

function stopGame () {
  countdown.clearTimer()
  viewHandler.homeViewInit()
  homeView.loadRanking()
}

function getCurrentMode () {
  return isLocalGame() ? local : server
}

function getInvertedModeLabel () {
  return isLocalGame() ? 'server' : 'local'
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

function addToLocalHistory (game) {
  return local.history.push(game)
}

function addToServerHistory (game) {
  return server.history.push(game)
}

export const controller = {
  initGame,
  stopGame,
  getDataForHandlebars,
  isLocalGame,
  getCurrentGame,
  setCurrentGame,
  resetOption,
  isChosen,
  setChosen,
  setMode,
  addToLocalHistory,
  addToServerHistory,
  getInvertedModeLabel,
  getPlayerName
}
