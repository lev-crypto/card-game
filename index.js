const Game = require('./src/game')

const game = new Game()
game.createGame()
game.showDistributedCards()
const winner = game.getWinner()

console.log(`Winner is player: ${winner.id}`)
winner.cards.forEach((card) => console.log(`Card: ${card.v}, Suite: ${card.Suite}`))