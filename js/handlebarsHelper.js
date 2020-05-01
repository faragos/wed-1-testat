'use strict'
import { controller } from './controller.js'

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
  let currGame = controller.getCurrentGame()
  return currGame && currGame.playerHand === currentHand ? `icon-${currGame.result}` : ''
})