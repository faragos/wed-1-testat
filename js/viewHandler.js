'use strict'
import { controller } from './controller.js'
import { players } from './playerHandler.js'

function gameViewInit () {
  const gameFragmentTemplateSource = document.getElementById('game-template').innerHTML
  const gameFragmentHtmlString = Handlebars.compile(gameFragmentTemplateSource)
  document.getElementById('main').innerHTML = gameFragmentHtmlString(controller.getDataForHandlebars())
}

function homeViewInit () {
  const playerFragmentTemplateSource = document.getElementById('home-template').innerHTML
  const createPlayerFragmentHtmlString = Handlebars.compile(playerFragmentTemplateSource)
  document.getElementById('main').innerHTML = createPlayerFragmentHtmlString(controller.getDataForHandlebars())
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