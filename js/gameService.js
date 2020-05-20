'use strict'

import { controller } from './controller.js'
import { Game } from './game.js'
import { exampleData } from './playerHandler.js'

async function fetchPlayers () {
  if (controller.isLocalGame()) {
    return exampleData
  } else {
    let playerResponse = await fetch('https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking')
    if (playerResponse.ok) {
      return playerResponse.json()
    }
  }
}

function doesPlayerExist (playerName) {
  return !!exampleData[playerName]
}

async function fetchGame (playerName, playerHand, playerHandLabel) {
  let game
  if (controller.isLocalGame()) {
    game = new Game(playerName, playerHand)
    if (!doesPlayerExist(playerName)) {
      exampleData[playerName] = {win: 0, lost: 0, user: playerName}
    }
    if (game.result !== 'tie') {
      exampleData[playerName][game.result]++
    }
    controller.addToLocalHistory(game)
  } else {
    let playResponse = await fetch(
      `https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/play?playerName=${playerName}&playerHand=${playerHandLabel}`)
    if (playResponse.ok) {
      let playResponseJson = await playResponse.json()
      game = new Game(playerName, playerHand, true, playResponseJson.choice, playResponseJson.win)
    }
    controller.addToServerHistory(game)
  }
  return game
}

export const gameService = {
  fetchPlayers,
  fetchGame
}