window.rockPaperScissors.gameService = window.rockPaperScissors.gameService || (function () {
  async function fetchPlayers () {
    let playerResponse = await fetch('https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking')
    if (playerResponse.ok) {
      return playerResponse.json()
    }
  }

  async function fetchGame (playerName, playerHand) {
    let playResponse = await fetch(
      `https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/play?playerName=${playerName}&playerHand=${playerHand}`)
    if (playResponse.ok) {
      return playResponse.json()
    }
  }

  return {
    fetchPlayers,
    fetchGame
  }
})()