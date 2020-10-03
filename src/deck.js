class Deck {
    constructor(){
        this.suits = ['Spades', 'Diamond', 'Clubs', 'Hearts']
        this.cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        this.deckCards = []
    }

    createDeck(){
        for (let s = 0; s < this.suits.length; s++) {
            for (let c = 0; c < this.cards.length; c++) {
                let card = { v: this.cards[c], Suite: this.suits[s] };
                this.deckCards.push(card);
            }
        }
    }

    shuffleDeck(){
        console.log("Shuffling deck")
        for (let i = this.deckCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deckCards[i];
            this.deckCards[i] = this.deckCards[j];
            this.deckCards[j] = temp;
        }
    }

}

module.exports =  Deck 