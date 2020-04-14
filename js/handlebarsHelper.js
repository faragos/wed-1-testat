Handlebars.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

Handlebars.registerHelper('ternary', function (test, yes, no) {
  return test ? yes : no
})

Handlebars.registerHelper('buttonIcon', function (currentHand) {
  return rockPaperScissors.currentGame && rockPaperScissors.currentGame.playerHand === currentHand ? `icon-${rockPaperScissors.currentGame.result}` : ''
})