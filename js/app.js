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
let shuffledDeck = [];
let winnings = 1000;
let total = 0;
let dealerTotal = 0;

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
let deal = document.querySelector(".deal")
let dealHand = document.getElementById('dealButton')
let actions = document.querySelector('.action');
let bets = document.querySelector('.bets');
let playerHand = document.createElement("div");
let dealerHand1 = document.createElement("div");
let dealerHand2 = document.createElement("div");
let dealerHand = document.createElement("div");

/*----- event listeners -----*/

hit.addEventListener('click', hitHand);
stand.addEventListener('click', standHand);
// doubleDown.addEventListener('click', doubleDownBet);
// split.addEventListener('click', splitHand);
console.log(redChip)
redChip.addEventListener('click', addRed);
blackChip.addEventListener('click', addBlack);
// blackIns.addEventListener('click', addBlackIns)
dealHand.addEventListener('click', dealCards);


/*----- functions -----*/

init();

function init() {
    let balance = 10000;
    amount.innerHTML = balance;
    split.disabled = "true";

    let betMsg = document.createElement("div");
    betMsg.innerHTML = "Place Your Bets!";
    msg.appendChild(betMsg);
    shuffleDeck(deck);

}

function standHand() {
    while(dealerCards.firstChild){
        dealerCards.removeChild(dealerCards.firstChild)
    }
    for (let i = 0; i < dealer.length; i++) {
        let dealerHand = document.createElement("div");
        dealerHand.className = "card " + dealer[i].card;
        dealerCards.appendChild(dealerHand);
        console.log(dealerHand)
    }
    dealerCheckFor21();
}

function hitHand() {
    dealPlayerCard();
    render();
    checkFor21();
}

function dealerCheckFor21() {
    for (var i = 0; i < dealer.length; i++) {
        dealerTotal = dealerTotal + dealer[i].value;

        if (dealerTotal <= 16) {
            dealDealerCard();

        } 
    
    }
}

function checkFor21() {
    for (var i = 0; i < player.length; i++) {
        total = total + player[i].value;

        if (total > 21) {
            alert('you busted')
        } else if (total <17) {
            console.log('you can hit')
        } else {
            hit.disabled = "true";
        } 

    }
}


function dealCards() {
    dealPlayerCard();
    dealDealerCard();
    dealPlayerCard();
    dealDealerCard();
    render();
    checkFor21();

    actions.style.display = "block";
    deal.style.display = "none";
}

function addRed() {
    msg.style.display = "none";
    balance = balance - 500;
    amount.innerHTML = balance;
    betBalance = betBalance + 500;
    betAmount.innerHTML = betBalance;
    deal.style.display = "block";
}

function addBlack() {
    msg.style.display = "none";
    balance = balance - 100;
    amount.innerHTML = balance;
    betBalance = betBalance + 100;
    betAmount.innerHTML = betBalance;
    deal.style.display = "block"
}

function shuffleDeck(array) {
    let n = array.length;
    let i;
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
    let playerCard = shuffledDeck.pop();
    player.push(playerCard);
    playerCards.appendChild(playerHand)
};

function dealDealerCard() {
    let dealerCard = shuffledDeck.pop();
    dealer.push(dealerCard);
}

function render() {
    while(playerCards.firstChild){
        playerCards.removeChild(playerCards.firstChild)
    }
    while(dealerCards.firstChild){
        dealerCards.removeChild(dealerCards.firstChild)
    }
    for (let i = 0; i < player.length; i++) {
        let playerHand = document.createElement("div");
        playerHand.className = "card " + player[i].card;
        playerCards.appendChild(playerHand);
        console.log(playerHand)
    }

    let dealerHand1 = document.createElement("div");
    let dealerHand2 = document.createElement("div");
    dealerHand1.className = "card " + dealer[0].card;
    dealerHand2.className = "card " + "back blue"
    dealerCards.appendChild(dealerHand1);
    dealerCards.appendChild(dealerHand2);
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

// function checkForBust() 