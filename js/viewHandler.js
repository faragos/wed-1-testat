'use strict'
window.rockPaperScissors.viewHandler = (function () {
  function gameView () {
    const gameFragmentTemplateSource = document.getElementById('game-template').innerHTML
    const gameFragmentHtmlString = Handlebars.compile(gameFragmentTemplateSource)
    document.getElementById('main').innerHTML = gameFragmentHtmlString(rockPaperScissors.controller.getDataForHandlebars())

    rockPaperScissors.gameView.addEventListenerToButtonOptions()
  }

  function homeView () {
    const playerFragmentTemplateSource = document.getElementById('home-template').innerHTML
    const createPlayerFragmentHtmlString = Handlebars.compile(playerFragmentTemplateSource)
    document.getElementById('main').innerHTML = createPlayerFragmentHtmlString(rockPaperScissors.controller.getDataForHandlebars())

    rockPaperScissors.homeView.addEventListenerToButtons()
  }

  function rankingView () {
    const rankingFragmentTemplateSource = document.getElementById('ranking-template').innerHTML
    const createRankingFragmentHtmlString = Handlebars.compile(rankingFragmentTemplateSource)
    document.getElementById('ranking-container').innerHTML = createRankingFragmentHtmlString(rockPaperScissors.playersSorted)
  }

  return {
    gameView,
    homeView,
    rankingView
  }

})()