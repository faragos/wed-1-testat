'use strict'

import { gameData, symbolDefinitions } from './gameData.js'

export class Game {
  constructor (playerName, playerHand, server = false, opponentHandLabel, result) {
    this.playerName = playerName
    this.playerHand = playerHand
    this.playerHandLabel = gameData.findLabel(this.playerHand)
    this.time = 3
    if (server) {
      this.opponentHand = gameData.findKey(opponentHandLabel)
      this.opponentHandLabel = opponentHandLabel
      if (result) {
        this.result = 'win'
      } else if (result === false) {
        this.result = 'lost'
      } else {
        this.result = 'tie'
      }
    } else {
      this.opponentHand = symbolDefinitions[Math.floor(Math.random() * 5)].symbol
      this.opponentHandLabel = gameData.findLabel(this.opponentHand)
      this.result = gameData.getResult(this.playerHand, this.opponentHand)
    }
  }
}