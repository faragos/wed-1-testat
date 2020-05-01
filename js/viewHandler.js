'use strict'
import { controller } from './controller.js'
import { homeView } from './homeView.js'
import { gameView } from './gameView.js'
import { players } from './playerHandler.js'

function gameViewInit () {
  const gameFragmentTemplateSource = document.getElementById('game-template').innerHTML
  const gameFragmentHtmlString = Handlebars.compile(gameFragmentTemplateSource)
  document.getElementById('main').innerHTML = gameFragmentHtmlString(controller.getDataForHandlebars())

  gameView.addEventListenerToButtonOptions()
}

function homeViewInit () {
  const playerFragmentTemplateSource = document.getElementById('home-template').innerHTML
  const createPlayerFragmentHtmlString = Handlebars.compile(playerFragmentTemplateSource)
  document.getElementById('main').innerHTML = createPlayerFragmentHtmlString(controller.getDataForHandlebars())

  homeView.addEventListenerToButtons()
}

function rankingView () {
  const rankingFragmentTemplateSource = document.getElementById('ranking-template').innerHTML
  const createRankingFragmentHtmlString = Handlebars.compile(rankingFragmentTemplateSource)
  document.getElementById('ranking-container').innerHTML = createRankingFragmentHtmlString(players)
}

export const viewHandler = {
  gameViewInit,
  homeViewInit,
  rankingView
}