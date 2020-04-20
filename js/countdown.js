'use strict'
window.rockPaperScissors.countdown = window.rockPaperScissors.countdown || function () {
  let timeinterval
  let time = 3

  function startTimer (seconds) {
    let timer = seconds
    timeinterval = setInterval(function () {
      time = timer - 1
      if (--timer < 0) {
        clearTimer()
      }
      rockPaperScissors.viewHandler.gameView()
    }, 1000)
  }

  function clearTimer () {
    clearInterval(timeinterval)
    time = 3
    rockPaperScissors.controller.resetOption()
  }

  function getCurrentTime () {
    return time
  }

  return {
    startTimer,
    clearTimer,
    getCurrentTime
  }
}()