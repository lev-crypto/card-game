class Player {
    constructor(id){
        this.cards = []
        this.isPlaying = true
        this.id = id
        this.rank = undefined
    }

    setCards(card) {
        this.cards.push(card)
    }

    setIsPlaying(isPlaying) {
        this.isPlaying = isPlaying
    }

    getPlayerId() {
        return this.id
    }

    setPlayerRank(rank) {
        this.rank = rank
    }

    getPlayerRank() {
        return this.rank
    }
}

module.exports = Player