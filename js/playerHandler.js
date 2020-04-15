rockPaperScissors.exampleData = {
  'Gino': {'lost': 23, 'user': 'Gino', 'win': 10},
  'Marco': {'lost': 10, 'user': 'Marco', 'win': 1},
  'Armend': {'lost': 5, 'user': 'Armend', 'win': 4},
  'Christian': {'lost': 5, 'user': 'Christian', 'win': 4}
}

rockPaperScissors.players = rockPaperScissors.exampleData

rockPaperScissors.playerHandler = (function () {
  function comparePlayers (s1, s2) {
    return s2[1][0].win - s1[1][0].win
  }

  function playersSorted () {
    let result = Object.values(rockPaperScissors.players)
    return Object.entries(groupBy([...result], 'win')).sort(comparePlayers)
  }

  function groupBy (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  function sortPlayers () {
    rockPaperScissors.playersSorted = playersSorted()
  }

  return {
    sortPlayers
  }
})()

rockPaperScissors.playerHandler.sortPlayers()

