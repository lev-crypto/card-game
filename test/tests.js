const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const Game = require('../src/game');
const Deck = require('../src/deck')

describe('Unit test', () => {

    before(() => {
        // Disabling logs while running unit test , please comment below statement to see logs
        sinon.stub(console, 'log')
    })

    it('should return palyer 1 as winner when it has a pair with rank 3', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: '8', Suite: 'Spades' }, { v: 'Q', Suite: 'Clubs' },{ v: '4', Suite: 'Diamond' }, 
                { v: '8', Suite: 'Diamond' }, { v: 'Q', Suite: 'Hearts' }, { v: '6', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '1', Suite: 'Clubs' }, { v: '3', Suite: 'Clubs' }, { v: '10', Suite: 'Spades' },
                { v: '2', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(1)
        expect(winner.rank).to.be.equal(3)
    })

    it('should return palyer 3 as winner when it has a trial with rank 1', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: '8', Suite: 'Spades' }, { v: 'A', Suite: 'Clubs' },{ v: '4', Suite: 'Diamond' }, 
                { v: '8', Suite: 'Diamond' }, { v: 'Q', Suite: 'Hearts' }, { v: 'A', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '1', Suite: 'Clubs' }, { v: 'A', Suite: 'Spades' }, { v: '10', Suite: 'Spades' },
                { v: '2', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(3)
        expect(winner.rank).to.be.equal(1)
    })

    it('should return palyer 2 as winner when it has a sequence with rank 2', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: 'A', Suite: 'Spades' }, { v: 'A', Suite: 'Clubs' },{ v: '4', Suite: 'Diamond' }, 
                { v: '8', Suite: 'Diamond' }, { v: '2', Suite: 'Hearts' }, { v: 'A', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '3', Suite: 'Clubs' }, { v: '5', Suite: 'Spades' }, { v: '10', Suite: 'Spades' },
                { v: '2', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(2)
        expect(winner.rank).to.be.equal(2)
    })

    it('should return palyer 4 as winner when it has the highest card with rank 4', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: '4', Suite: 'Spades' }, { v: 'K', Suite: 'Clubs' },{ v: 'A', Suite: 'Clubs' }, 
                { v: '7', Suite: 'Diamond' }, { v: '2', Suite: 'Hearts' }, { v: 'Q', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '9', Suite: 'Clubs' }, { v: '5', Suite: 'Spades' }, { v: '10', Suite: 'Spades' },
                { v: '2', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(4)
        expect(winner.rank).to.be.equal(4)
    })

    it('should return palyer 4 as winner player 3 and 4 has a tie and player 4 gets a higher card in the second draw', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: '4', Suite: 'Spades' }, { v: 'A', Suite: 'Diamond' },{ v: 'A', Suite: 'Clubs' }, 
                { v: '7', Suite: 'Diamond' }, { v: '2', Suite: 'Hearts' }, { v: 'Q', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '9', Suite: 'Clubs' }, { v: '5', Suite: 'Spades' }, { v: '10', Suite: 'Spades' },
                { v: '2', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(4)
        expect(winner.rank).to.be.equal(4)
    })

    it('should return palyer 2 as winner player 2 and 4 has a tie (2 times) and player 2 gets a higher card in the third draw', () => {
        const game = new Game()
        sinon.stub(game.deck, "shuffleDeck").callsFake(function() {
            console.log("No shuffling: Running in test mode, returning static deck")
            game.deck.deckCards = [
                { v: '8', Suite: 'Clubs' }, { v: 'A', Suite: 'Spades' }, { v: '4', Suite: 'Diamond' },{ v: 'A', Suite: 'Clubs' }, 
                { v: '7', Suite: 'Diamond' }, { v: 'Q', Suite: 'Hearts' }, { v: '2', Suite: 'Hearts' }, { v: '6', Suite: 'Diamond' },
                { v: '10', Suite: 'Hearts' }, { v: '5', Suite: 'Clubs' }, { v: '9', Suite: 'Spades' }, { v: '10', Suite: 'Spades' },
                { v: '7', Suite: 'Clubs' }, { v: '7', Suite: 'Spades' }, { v: 'Q', Suite: 'Diamond' }, { v: '9', Suite: 'Hearts' }
            ]
        })

        game.createGame()
        const winner = game.getWinner()
        expect(winner.id).to.be.equal(2)
        expect(winner.rank).to.be.equal(4)
    })

    after(() => {
        // Restoring original method
        sinon.restore();
    })
})