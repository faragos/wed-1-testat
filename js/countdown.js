function startTimer (seconds) {
  let timer = seconds
  rockPaperScissors.timeinterval = setInterval(function () {
    rockPaperScissors.currentGame.time = timer - 1
    if (--timer < 0) {
      clearTimer()
    }
    gameView()
  }, 1000)
}

function clearTimer () {
  clearInterval(rockPaperScissors.timeinterval)
  rockPaperScissors.currentGame = null
}
