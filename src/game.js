const Deck = require('./deck')
const { createPlayers, allEqual, isSequence, isPair, mapNumbersToCards, 
    getPlayersWithHighestCard, mapToIntegerValue, mapAceToHighestNumber } = require('./handler')


class Game {
    constructor(){
        this.deck = new Deck()
        this.players = createPlayers()
        this.bucket_1 = []
        this.bucket_2 = []
        this.bucket_3 = []
        this.bucket_4 = []
        this.tie_bucket = []
    }

    createGame() {
        this.deck.createDeck()
        this.deck.shuffleDeck()

        for(let i = 0; i < 3; i++) {
            this.players[0].setCards(this.deck.deckCards[0])
            this.players[1].setCards(this.deck.deckCards[1])
            this.players[2].setCards(this.deck.deckCards[2])
            this.players[3].setCards(this.deck.deckCards[3])
        
            this.deck.deckCards.splice(0,4)
        }
    }

    getWinner() {
        let winner  = {}
        for(let i = 0; i < this.players.length; i++) {
            this.checkGameRules(this.players[i])
        }
        
        this.players.sort((a, b) => {
            if (a.rank < b.rank)
                return -1
            return 1
        })
        
        const res = this.isAllRandom(this.players)

        if(res[0]) {
            console.log("No rules were observed: Trial, Sequence, Pair\n")
            getPlayersWithHighestCard(res[1], this.tie_bucket)
            if (this.tie_bucket.length == 1) {
                winner =  this.tie_bucket[0]
            } else {
                winner  = this.tieBraker()
            }
        } else {
            winner  = res[1][0]
        }

        mapNumbersToCards(winner.cards)
        return winner
    }

    checkGameRules(player){
        if(allEqual(player.cards)) {
            player.rank = 1
            return
        }
        
        if(isSequence(player.cards)) {
            player.rank = 2
            return
        }

        if(isPair(player.cards)) {
            player.rank = 3
            return 
        }

        mapAceToHighestNumber(player.cards)
        player.rank = 4
    }

    isAllRandom(players) {
        for (let i = 0; i < players.length; i++) {
            if(players[i].rank == 1)
                this.bucket_1.push(players[i])
            else if(players[i].rank == 2)
                this.bucket_2.push(players[i])
            else if(players[i].rank == 3)
                this.bucket_3.push(players[i])
            else if(players[i].rank == 4)
                this.bucket_4.push(players[i])
        }
        
        const bucket = this.bucket_1.length == 0 ? (this.bucket_2.length == 0 ? ( this.bucket_3.length == 0 ? ( this.bucket_4.length == 0 ? null : this.bucket_4) : this.bucket_3) : this.bucket_2 ) : this.bucket_1

        if( bucket.length > 1)
            return [true, bucket]

        return [false, bucket]
    }

    tieBraker(){
        console.log("It's a tie")
        this.tie_bucket.forEach((player) => {
            player.cards.length = 0
        })

        this.tie_bucket.forEach((player) => {
            let card = this.deck.deckCards[0]
            console.log("Card distributed to player:", player.id, card)
            mapToIntegerValue([card], true)
            player.cards.push(card)
            this.deck.deckCards.splice(0,1)
        })
        console.log("\n")
        const players = JSON.parse(JSON.stringify(this.tie_bucket))
        this.tie_bucket.length = 0

        getPlayersWithHighestCard(players, this.tie_bucket)

        if (this.tie_bucket.length == 1)
            return this.tie_bucket[0]
        
        return this.tieBraker()
    }

    showDistributedCards() {
        this.players.forEach((player) => {
            console.log(`Player Id: ${player.id}`)
            player.cards.forEach((card) => console.log(`Card: ${card.v}, Suite: ${card.Suite}`))
            console.log("\n")
        })
    }
}

module.exports = Game