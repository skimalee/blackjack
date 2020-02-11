/*----- constants -----*/

const deck =

    [
        { value: "A", card: "dA" },
        { value: "A", card: "hA" },
        { value: "A", card: "cA" },
        { value: "A", card: "sA" },
        { value: 2, card: "d02" },
        { value: 2, card: "h02" },
        { value: 2, card: "c02" },
        { value: 2, card: "s02" },
        { value: 3, card: "d03" },
        { value: 3, card: "h03" },
        { value: 3, card: "c03" },
        { value: 3, card: "s03" },
        { value: 4, card: "d04" },
        { value: 4, card: "h04" },
        { value: 4, card: "c04" },
        { value: 4, card: "s04" },
        { value: 5, card: "d05" },
        { value: 5, card: "h05" },
        { value: 5, card: "c05" },
        { value: 5, card: "s05" },
        { value: 6, card: "d06" },
        { value: 6, card: "h06" },
        { value: 6, card: "c06" },
        { value: 6, card: "s06" },
        { value: 7, card: "d07" },
        { value: 7, card: "h07" },
        { value: 7, card: "c07" },
        { value: 7, card: "s07" },
        { value: 8, card: "d08" },
        { value: 8, card: "h08" },
        { value: 8, card: "c08" },
        { value: 8, card: "s08" },
        { value: 9, card: "d09" },
        { value: 9, card: "h09" },
        { value: 9, card: "c09" },
        { value: 9, card: "s09" },
        { value: 10, card: "d10" },
        { value: 10, card: "h10" },
        { value: 10, card: "c10" },
        { value: 10, card: "s10" },
        { value: 10, card: "dJ" },
        { value: 10, card: "hJ" },
        { value: 10, card: "cJ" },
        { value: 10, card: "sJ" },
        { value: 10, card: "dQ" },
        { value: 10, card: "hQ" },
        { value: 10, card: "cQ" },
        { value: 10, card: "sQ" },
        { value: 10, card: "dK" },
        { value: 10, card: "hK" },
        { value: 10, card: "cK" },
        { value: 10, card: "sK" }
    ]

    let red = 500;
    let black = 100;
    let balance = 10000;
    let betBalance = 0;

/*----- app's state (variables) -----*/

let player = [];
let dealer = [];
let shuffledDeck = []
let winnings = 1000;

/*----- cached element references -----*/

let amount = document.querySelector(".amount");
let dealerCards = document.querySelector(".dealerHand")
let playerCards = document.querySelector(".playerHand");
let hit = document.getElementById("hit");
let stand = document.getElementById("stand");
let doubleDown = document.getElementById("doubleDown");
let split = document.getElementById("split");
let blackChip = document.getElementById("black");
let redChip = document.getElementById("red");
let blackIns = document.getElementById("blackIns");
let redIns = document.getElementById("redIns");
let msg = document.querySelector(".message");
let betAmount = document.querySelector(".betAmount")

/*----- event listeners -----*/

// hit.addEventListener('click', hitHand);
// stand.addEventListener('click', standHand);
// doubleDown.addEventListener('click', doubleDownBet);
// split.addEventListener('click', splitHand);
console.log(redChip)
redChip.addEventListener('click', addRed);
// blackChip.addEventListener('click', addBlack);
// blackIns.addEventListener('click', addBlackIns)


/*----- functions -----*/

init();

function init() {
    let balance = 10000;
    amount.innerHTML = balance;

    let betMsg = document.createElement("div");
    betMsg.innerHTML = "Place Your Bets!";
    msg.appendChild(betMsg);
    shuffleDeck(deck);

}

// function dealCards() {

//     dealPlayerCard();
//     dealDealerCard();
//     dealPlayerCard();
//     dealDealerCard();
//     render();
// }

function addRed() {

    msg.style.display = "none";
    balance = balance - 500;
    amount.innerHTML = balance;
    console.log('this works')
    
    betBalance = betBalance + 500;
    betAmount.innerHTML = betBalance;

}

function shuffleDeck(array) {
    let n = array.length;
    let i

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);

        // And move it to the new array.
        shuffledDeck.push(array.splice(i, 1)[0]);
    }
}


// need a function to deal cards
function dealPlayerCard() {

    console.log(shuffledDeck)
    let playerCard = shuffledDeck.pop();
    player.push(playerCard);

};

function dealDealerCard() {
    let dealerCard = shuffledDeck.pop();
    dealer.push(dealerCard);
}

function render() {

    for (let i = 0; i < player.length; i++) {

        let dealerHand = document.createElement("div");
        let playerHand = document.createElement("div");

        playerHand.className = "card " + player[i].card;
        playerCards.appendChild(playerHand);
        console.log(playerHand);

    

        dealerHand.className = "card " + dealer[i].card;
        dealerCards.appendChild(dealerHand);
        console.log(dealerHand);

            if (i > 0) {
                dealerHand.className = "card back";

            }

    }
}


// function addValues() {

// }
// // need a function to be able to split hand with same values
// function splitHand() {

// };



// // need a function to call insurance
// function insurance() {

// }

// // need a function to check for Blackjack
// function blackJack() {

// }

// // need a function to check for a bust

// function checkForBust() {

// }
