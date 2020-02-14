/*----- constants -----*/

let deck =
    [
        { value: 11, card: "dA" },
        { value: 11, card: "hA" },
        { value: 11, card: "cA" },
        { value: 11, card: "sA" },
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
    ];
let red = 500;
let black = 100;
let balance = 10000;
let betBalance = 0;


/*----- app's state (variables) -----*/

let player = [];
let dealer = [];
let splitties = [];
let shuffledDeck = [];
let winnings = 1000;
let total = 0;
let dealerTotal = 0;

/*----- cached element references -----*/

let amount = document.querySelector(".amount");
let dealerCards = document.querySelector(".dealerHand");
let playerCards = document.querySelector(".playerHand");
let hit = document.getElementById("hit");
let stand = document.getElementById("stand");
let doubleDown = document.getElementById("doubleDown");
let split = document.getElementById("split");
let blackChip = document.getElementById("black");
let redChip = document.getElementById("red");
let blackIns = document.getElementById("blackIns");
let redIns = document.getElementById("redIns");
let betAmount = document.querySelector(".betAmount");
let deal = document.querySelector(".deal");
let dealHand = document.getElementById('dealButton');
let actions = document.querySelector('.action');
let bets = document.querySelector('.bets');
let playerHand = document.createElement("div");
let dealerHand1 = document.createElement("div");
let dealerHand2 = document.createElement("div");
let dealerHand = document.createElement("div");
let whoWins = document.getElementById("whoWins");

let resetButton = document.querySelector("#reset-button");
/*----- event listeners -----*/

hit.addEventListener('click', hitHand);
stand.addEventListener('click', standHand);
doubleDown.addEventListener('click', doubleDownBet);
// split.addEventListener('click', splitHand);
// console.log(redChip)
redChip.addEventListener('click', addRed);
blackChip.addEventListener('click', addBlack);
// blackIns.addEventListener('click', addBlackIns)
dealHand.addEventListener('click', dealCards);
resetButton.addEventListener('click', handleReset);


// modals
let msg = document.querySelector(".message");
let winMsg = document.querySelector(".winMsg")



/*----- functions -----*/

init();

function handleReset() {
    player = [];
    dealer = [];
    shuffledDeck = [];
    total = 0;
    betBalance = 0;
    hit.disabled = false;
    dealerCards.innerHTML = '';
    playerCards.innerHTML = '';
    actions.style.display = "none";
    whoWins.textContent = '';
    init();
}

function init() {
    amount.innerHTML = balance;
    split.disabled = "true";
    msg.style.display = "block";
    bets.style.display = "block";
    winMsg.style.display = "none";
    shuffleDeck([...deck]);
}

function dealerCheckForAces() {
    let dealerAces = 0;
    let dealerTotal = 0;
    for (var i = 0; i < dealer.length; i++) {
        dealerTotal += dealer[i].value;

        if (dealer[i].value === 11) {
            dealerAces += 1
        }
    if (dealerTotal > 21 && dealerAces > 0) {

         dealerTotal = dealerTotal - 10;
    }
        console.log(dealerTotal)
    }
    return dealerAces
}


function checkForAces() {
    console.log("checking for aces")
    let aces = 0;
    total = 0;
    for (var i = 0; i < player.length; i++) {
        total = total + player[i].value;

        if (player[i].value === 11) {
            aces += 1
        }
        if (total > 21 && aces > 0) {
        total = total - 10;
         }
    console.log(total)
    }
    return aces
}

function allCardsUp() {
    while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.firstChild)
    }
    for (let i = 0; i < dealer.length; i++) {
        let dealerHand = document.createElement("div");
        dealerHand.className = "card " + dealer[i].card;
        dealerCards.appendChild(dealerHand);
    }
}
function doubleDownBet() {
    balance = balance - betBalance;
    amount.innerHTML = balance;
    betBalance = betBalance * 2;
    betAmount.innerHTML = betBalance;
    dealPlayerCard();
    render();
    checkForAces();
    hit.disabled = true;
    standHand();
}
function standHand() {
    render()
    allCardsUp()
    dealerCheckForAces();
    dealerCheckFor21();
}

function hitHand() {
    dealPlayerCard();
    render();
    checkForAces();
    checkFor21();
}

function dealerCheckFor21() {
    dealerTotal = 0
    for (var i = 0; i < dealer.length; i++) {
        dealerTotal = dealerTotal + dealer[i].value;
    }

    if (dealerTotal > 21) {
            let currentDealerAces = dealerCheckForAces();

            if (currentDealerAces) {
                dealerTotal -= 10

                if (dealerTotal < 16) {
                    dealDealerCard();
                    render();
                    dealerCheckForAces();
                    dealerCheckFor21();

                } else {
                    allCardsUp();
                    render()
                    dealerCheckForAces();
                    winMsg.style.display = "block";
                    whoWins.textContent = `DEALER BUSTS!`;
                    winMsg.insertBefore(whoWins, resetButton);
                    balance = balance + (betBalance * 2);
                    amount.innerHTML = balance;
                }
            } else {
                allCardsUp();
                render()
                winMsg.style.display = "block";
                whoWins.textContent = `DEALER BUSTS`;
                winMsg.insertBefore(whoWins, resetButton);
                balance = balance + (betBalance * 2);
                amount.innerHTML = balance;
            }

    } else if (dealerTotal === 21 && dealer.length === 2) {
        winMsg.style.display = "block";
        whoWins.textContent = `DEALER BLACKJACK`;
        winMsg.insertBefore(whoWins, resetButton);

    } else if (dealerTotal === 21 && dealerTotal > total) {
        allCardsUp();
        render()
        winMsg.style.display = "block";
        whoWins.textContent = `DEALER WINS`;
        winMsg.insertBefore(whoWins, resetButton);
        return

    } else if (dealerTotal <= 16) {
        setTimeout(function () {
            dealDealerCard();
            render();
            dealerCheckFor21();
        }, 1000);

    } else if (dealerTotal < 21 && dealerTotal > 16) {
        let thisTotal = 0

        for (var i = 0; i < player.length; i++) {
            thisTotal = thisTotal + player[i].value;
        }

        if (dealerTotal > total) {
            setTimeout(function () {
                render();
                allCardsUp();
                checkForAces();
                winMsg.style.display = "block";
                whoWins.textContent = `DEALER WINS`;
                winMsg.insertBefore(whoWins, resetButton);
                return
            }, 1000)

        } else if (dealerTotal < total) {
            setTimeout(function () {
                render();
                allCardsUp();
                checkForAces();
                winMsg.style.display = "block";
                whoWins.textContent = `PLAYER WINS!`;
                winMsg.insertBefore(whoWins, resetButton);
                balance = balance + (betBalance * 2);
                amount.innerHTML = balance;
                return
            }, 1000)

        } else if (dealerTotal === total) {
            setTimeout(function () {
                render()
                allCardsUp()
                checkForAces();
                winMsg.style.display = "block";
                whoWins.textContent = `PUSH!`;
                winMsg.insertBefore(whoWins, resetButton);
                balance = balance + betBalance
                amount.innerHTML = balance;
                return
            }, 1000)
        }
    }
}

function checkFor21() {
    let total = 0;
    for (var i = 0; i < player.length; i++) {
        total = total + player[i].value;
    }

    if (total > 16 && total <= 21) {
        hit.disabled = true;
    }

    if (player.length === 2 && total === 21) {
            winMsg.style.display = "block";
            whoWins.textContent = `BLACKJACK!!!`;
            winMsg.insertBefore(whoWins, resetButton);
            balance = balance + betBalance + (betBalance * 1.5);
            amount.innerHTML = balance;

    } else if (total > 21) {
        setTimeout(function() {
        let currentAces = checkForAces();

        if (currentAces) {
            for (i=0; i < currentAces; i++) {
                if (total > 21) {
                    total -= 10;
                } else {
                    break;
                }
            }

            if (total > 16) {
            hit.disabled = true;
                if (total > 21) {
                    allCardsUp();
                    winMsg.style.display = "block";
                    whoWins.textContent = `PLAYER BUSTS`;
                    winMsg.insertBefore(whoWins, resetButton);
                    }
            } 

        } else {
            allCardsUp();
            winMsg.style.display = "block";
            whoWins.textContent = `PLAYER BUSTS`;
            winMsg.insertBefore(whoWins, resetButton);
        }

        render();
        }, 1000)
    }   
}



function dealCards() {
    dealPlayerCard();
    dealDealerCard();
    dealPlayerCard();
    dealDealerCard();
    render();
    checkForAces();
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
    while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);
        // And move it to the new array.
        shuffledDeck.push(array.splice(i, 1)[0]);
    }
}


// need a function to deal cards
function dealPlayerCard() {
    console.log(shuffledDeck);
    let playerCard = shuffledDeck.pop();
    player.push(playerCard);
    playerCards.appendChild(playerHand)
    checkForAces();
};

function dealDealerCard() {
    let dealerCard = shuffledDeck.pop();
    dealer.push(dealerCard);
}

function render() {
    while (playerCards.firstChild) {
        playerCards.removeChild(playerCards.firstChild)
    }
    while (dealerCards.firstChild) {
        dealerCards.removeChild(dealerCards.firstChild)
    }
    for (let i = 0; i < player.length; i++) {
        let playerHand = document.createElement("div");
        playerHand.className = "card " + player[i].card;
        playerCards.appendChild(playerHand);
    }
    while (dealerCards.lastChild) {
        dealerCards.removeChild(dealerCards.lastChildChild)
    }

    for (let i = 0; i < dealer.length; i++) {
        let dealerHand = document.createElement("div");
        if (dealer.length > 2) {
            dealerHand.className = "card " + dealer[i].card;
            dealerCards.appendChild(dealerHand);

        } else if (i > 0) {
            dealerHand.className = "card " + dealer[i].card;
            dealerCards.appendChild(dealerHand);
            
        } else {
            dealerHand.className = "card " + "back blue";
            dealerCards.appendChild(dealerHand);
        }
    }


}
