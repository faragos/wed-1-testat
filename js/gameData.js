'use strict'
rockPaperScissors.symbolDefinitions = [
  {
    symbol: 'rock',
    label: 'Stein',
    beats: [{
      symbol: 'scissors',
    }, {
      symbol: 'match',
    }]
  }, {
    symbol: 'paper',
    label: 'Papier',
    beats: [{
      symbol: 'rock',
    }, {
      symbol: 'fountain',
    }]
  }, {
    symbol: 'scissors',
    label: 'Schere',
    beats: [{
      symbol: 'paper',
    }, {
      symbol: 'match',
    }]
  }, {
    symbol: 'match',
    label: 'Streichholz',
    beats: [{
      symbol: 'fountain',
    }, {
      symbol: 'paper',
    }]
  }, {
    symbol: 'fountain',
    label: 'Brunnen',
    beats: [{
      symbol: 'scissors',
    }, {
      symbol: 'rock',
    }]
  }
]

rockPaperScissors.gameData = rockPaperScissors.gameData || function () {
  function getResult (playerHand, opponentHand) {
    if (beats(playerHand, opponentHand)) {
      return 'win'
    } else if (beats(opponentHand, playerHand)) {
      return 'lost'
    } else {
      return 'tie'
    }
  }

  function beats (playerHand, opponentHand) {
    return rockPaperScissors.symbolDefinitions.find(h => h.symbol === playerHand).beats.map(s => s.symbol).includes(opponentHand)
  }

  function findLabel (playerHand) {
    return rockPaperScissors.symbolDefinitions.find(h => h.symbol === playerHand).label
  }

  function findKey (label) {
    return rockPaperScissors.symbolDefinitions.find(h => h.label === label).symbol
  }

  return {
    getResult,
    findLabel,
    findKey
  }
}()

