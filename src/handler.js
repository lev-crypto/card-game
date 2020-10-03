const Player = require('./players')

function createPlayers(){
    let players = []
    players.push(new Player(1))
    players.push(new Player(2))
    players.push(new Player(3))
    players.push(new Player(4))

    return players
}

function allEqual(arr) {
    return arr.every((value,index,array) => {
        return value.v == array[0].v
    })
}

function isSequence(arr) {
    const decideA = arr.some((card) => card.v === 'K' || card.v === 'Q' || card.v === 'J' )
    mapToIntegerValue(arr, decideA)
    arr = arr.sort((a, b) => {
        if(+a.v < +b.v)
            return -1
        return 1
    })

    let prev = arr[0]
    for(let i = 1; i < arr.length; i++) {
        if( Math.abs(+arr[i].v - +prev.v) == 1 )
            prev = arr[i]
        else
            return false
    }

    return true
}

function mapToIntegerValue(arr, decideA) {
    for(let i = 0; i < arr.length; i++) {
        if(isNaN(+arr[i].v)) {
            if(arr[i].v.toUpperCase() === 'J')
                arr[i].v = '11'
            else if(arr[i].v.toUpperCase() === 'Q')
                arr[i].v = '12'
            else if(arr[i].v.toUpperCase() === 'K')
                arr[i].v = '13'
            else if(arr[i].v.toUpperCase() === 'A') {
                if (decideA)
                    arr[i].v = '14'
                else 
                    arr[i].v = '1'
            }
        }
    }
}

function isPair(arr) {
    const c1 = arr[0].v
    const c2 = arr[1].v
    const c3 = arr[2].v

    return c1 == c2 || c1 == c3 || c2 == c3
}

function mapNumbersToCards(cards) {
    for(let i = 0; i < cards.length; i++) {
        if (cards[i].v == '11')
            cards[i].v = 'J'
        else if (cards[i].v == '12')
            cards[i].v = 'Q'
        else if (cards[i].v == '13')
            cards[i].v = 'K'
        else if (cards[i].v == '1' || cards[i].v == '14')
            cards[i].v = 'A'
    }
}

function getPlayersWithHighestCard(players, tie_bucket) {
    // sorting cards
    for (let i = 0; i < players.length; i++){
        players[i].cards.sort((a, b) => {
            if( +a.v < +b.v)
                return -1
            return 1
        })
    }

    let max = 0
    for (let i = 0; i < players.length; i++){
        let numberOfCards = players[i].cards.length
        if(+players[i].cards[numberOfCards - 1].v >= max) {
            max = players[i].cards[numberOfCards - 1].v
        }
    }
    
    for (let i = 0; i < players.length; i++){
        let numberOfCards = players[i].cards.length
        if(+players[i].cards[numberOfCards - 1].v == max) {
            tie_bucket.push(players[i])
        }
    }
}

function mapAceToHighestNumber(cards) {
    for (let i = 0; i < cards.length; i++) {
        if(cards[i].v == '1'){
            cards[i].v = '14'
        }
    }
}

module.exports = { createPlayers, allEqual, isSequence, isPair, mapNumbersToCards, getPlayersWithHighestCard, mapToIntegerValue, mapAceToHighestNumber }