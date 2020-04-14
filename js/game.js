class Game {
  constructor (playerName, playerHand, server = false, opponentHandLabel, result) {
    this.playerName = playerName
    this.playerHand = playerHand
    this.playerHandLabel = findLabel(this.playerHand)
    this.time = 3
    if (server) {
      this.opponentHand = findKey(opponentHandLabel)
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
      this.opponentHandLabel = findLabel(this.opponentHand)
      this.result = getResult(this.playerHand, this.opponentHand)
    }
  }
}