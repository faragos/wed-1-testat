class Game {
  constructor (playerName, playerHand, server = false, opponentHandLabel, result) {
    this.playerName = playerName
    this.playerHand = playerHand
    this.playerHandLabel = rockPaperScissors.gameData.findLabel(this.playerHand)
    this.time = 3
    if (server) {
      this.opponentHand = rockPaperScissors.gameData.findKey(opponentHandLabel)
      this.opponentHandLabel = opponentHandLabel
      if (result) {
        this.result = 'win'
      } else if (result === false) {
        this.result = 'lost'
      } else {
        this.result = 'tie'
      }
    } else {
      this.opponentHand = rockPaperScissors.symbolDefinitions[Math.floor(Math.random() * 5)].symbol
      this.opponentHandLabel = rockPaperScissors.gameData.findLabel(this.opponentHand)
      this.result = rockPaperScissors.gameData.getResult(this.playerHand, this.opponentHand)
    }
  }
}