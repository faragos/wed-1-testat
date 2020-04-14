rockPaperScissors.exampleData = {
  'Gino': {'lost': 23, 'user': 'Gino', 'win': 10},
  'Marco': {'lost': 10, 'user': 'Marco', 'win': 1},
  'Armend': {'lost': 5, 'user': 'Armend', 'win': 4}
}

rockPaperScissors.players = rockPaperScissors.exampleData

function comparePlayers (s1, s2) {
  return s2.win - s1.win
}

function playersSorted () {
  let result = Object.values(rockPaperScissors.players)
  return [...result].sort(comparePlayers)
}

function sortPlayers () {
  rockPaperScissors.playersSorted = playersSorted()
}

sortPlayers()
