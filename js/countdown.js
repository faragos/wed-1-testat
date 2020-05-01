'use strict'
import { controller } from './controller.js'
import { viewHandler } from './viewHandler.js'

let timeinterval
let time = 3

function startTimer (seconds) {
  let timer = seconds
  timeinterval = setInterval(function () {
    time = timer - 1
    if (--timer < 0) {
      clearTimer()
    }
    viewHandler.gameViewInit()
  }, 1000)
}

function clearTimer () {
  clearInterval(timeinterval)
  time = 3
  controller.resetOption()
}

function getCurrentTime () {
  return time
}

export const countdown = {
  startTimer,
  clearTimer,
  getCurrentTime
}