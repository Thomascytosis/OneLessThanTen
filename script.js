const cards = {
  1: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/1.jpg",
  },
  2: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/2.jpg",
  },
  3: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/3.jpg",
  },
  4: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/4.jpg",
  },
  5: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/5.jpg",
  },
  6: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/6.jpg",
  },
  7: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/7.jpg",
  },
  8: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/8.jpg",
  },
  9: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/9.jpg",
  },
  10: {
    playerHasPlayed: false,
    computerHasPlayed: false,
    imageURL: "./images/10.jpg",
  },
};
const rules = document.getElementById("rulesBtn");
const quit = document.getElementById("quitBtn");
rules.onclick = () => {
  let rulesWindow = document.getElementById("rules");
  rulesWindow.classList.toggle("rules");
};
quit.onclick = () => {
  location.reload();
};
//  -----Toggle dream story
const dreamLink = document.getElementById("dream-link");
const dreamLink2 = document.getElementById("dream-link2");
const dreamBox = document.getElementById("dream");
const dream2 = document.getElementById("dream2");
dreamLink.onclick = () => {
  dreamBox.classList.toggle("show");
  dreamBox.onclick = () => {
    dreamBox.classList.toggle("show");
  };
};
dreamLink2.onclick = () => {
  dream2.classList.toggle("show");
  dream2.onclick = () => {
    dream2.classList.toggle("show");
  };
};
// -----End toggle dream story
// -----hide start menu
const startBtn = document.getElementById("start-game");
const startMenu = document.getElementById("start-menu");
const gameArea = document.getElementById("game");
const nav = document.getElementById("nav");
startBtn.onclick = () => {
  console.log("start button clicked");
  startMenu.classList.toggle("fade-out");
  gameArea.classList.toggle("show");
  nav.classList.add("show");
  setTimeout(() => {
    startMenu.classList.toggle("hide");
  }, 500);
  setTimeout(() => {
    nav.classList.add("fade-in");
    gameArea.classList.toggle("fade-in");
  }, 1000);
};
// ----End hide start menu

// -----play card UI
const hand = document.getElementById("player-hand");
const cardPlayed = document.getElementById("player-card");

// -----End play card UI
const playerPlayed = document.getElementById("player-played-cards");
cardPlayed.addEventListener("click", () => {
  cardToPlayed();
});

function cardToPlayed() {
  let div = cardPlayed.firstChild;
  if (div) {
    if (player.showPlayer == true) {
      playerPlayed.innerHTML += `${cardPlayed.innerHTML}`;
    }
    div.classList.add("fade-out");
    setTimeout(() => {
      div.remove();
    }, 750);
  }
}

function setup() {
  for (let i = 0; i < hand.children.length; i++) {
    let card = hand.children[i];
    card.setAttribute("id", i + 1);
    card.setAttribute("value", i + 1);
    card.addEventListener(
      "click",
      () => {
        if (card.classList.contains("selected")) {
          computerPlay();
          cardToPlayed();
          player.playerCard = card.getAttribute("value");
          cardPlayed.innerHTML = `<div class="card">${card.innerHTML}</div>`;
          if (player.gamblingRule == true) {
            card.classList.add("fade-out");
            setTimeout(() => {
              card.classList.add("hide");
            }, 750);
          }
          card.classList.remove("selected");
        } else {
          for (let j = 0; j < hand.children.length; j++) {
            let selected = hand.children[j];
            if (selected.classList.contains("selected")) {
              selected.classList.remove("selected");
            }
            card.classList.add("selected");
          }
        }
      },
      false
    );
  }
}
setup();

function resetAll() {
  player.playerCard = 0;
  player.computerCard = 0;
  player.win = false;
  player.winGame = false;
  player.loseGame = false;
  player.winCount = 0;
  player.loseCount = 0;
  // WHY IS THE BELOW CODE NOT WORKING?
  let cardPlayed = document.getElementById("player-card");
  let computerCard = document.getElementById("computer-card");
  let computerPlayed = document.getElementById("computer-played-cards");
  let playerPlayed = document.getElementById("player-played-cards");
  cardPlayed.firstChild.remove();
  playerPlayed.innerHTML = "";
  computerCard.firstChild.remove();
  computerPlayed.innerHTML = "";
  hand.innerHTML = `<div class="card"><img src="./images/1.jpg" /></div><div class="card"><img src="./images/2.jpg" /></div><div class="card"><img src="./images/3.jpg" /></div><div class="card"><img src="./images/4.jpg" /></div><div class="card"><img src="./images/5.jpg" /></div><div class="card"><img src="./images/6.jpg" /></div><div class="card"><img src="./images/7.jpg" /></div><div class="card"><img src="./images/8.jpg" /></div><div class="card"><img src="./images/9.jpg" /></div><div class="card"><img src="./images/10.jpg" /></div>`;
  setTimeout(() => {
    setup();
  }, 1000);
}

const computerCard = document.getElementById("computer-card");
const computerPlayed = document.getElementById("computer-played-cards");

var computerHand = [];
function updateComputerHand() {
  computerHand = [];
  for (const key in cards) {
    if (cards[key].computerHasPlayed == false) {
      computerHand.push(key);
    }
  }
  // console.log(computerHand);
}
updateComputerHand();

function randomCard(list) {
  rand = Math.floor(Math.random() * list.length);
  return rand;
}
function playedImage(rand) {
  return cards[rand].imageURL;
}

async function computerPlay() {
  var rand = await randomCard(computerHand);
  let next = computerHand[rand];
  player.computerCard = next;
  // console.log(player.computerCard);
  var image = await playedImage(next);
  if (player.gamblingRule == true) {
    cards[next].computerHasPlayed = true;
  }
  updateComputerHand();
  computerPlayedUI(image);
  winner();
}
function computerPlayedUI(image) {
  let computerCard = document.getElementById("computer-card");
  let computerPlayed = document.getElementById("computer-played-cards");
  if (computerCard.innerHTML) {
    if (player.showComputer == true) {
      computerPlayed.innerHTML += computerCard.innerHTML;
    }
  }
  computerCard.innerHTML = `<div class="card"><img src="${image}"></img></div>`;
}
const player = {
  playerCard: 0,
  computerCard: 0,
  win: false,
  winGame: false,
  loseGame: false,
  winCount: 0,
  loseCount: 0,
  showPlayer: false,
  showComputer: false,
  gamblingRule: false,
};
// Options checkbox
const gamblingCheck = document.getElementById("gambling-rule");
const playerCardCheck = document.getElementById("show-player-cards");
const computerCardCheck = document.getElementById("show-computer-cards");
gamblingCheck.addEventListener("click", () => {
  if (gamblingCheck.checked) {
    player.gamblingRule = true;
  } else {
    player.gamblingRule = false;
  }
});
playerCardCheck.addEventListener("click", () => {
  if (playerCardCheck.checked) {
    player.showPlayer = true;
  } else {
    player.showPlayer = false;
  }
});
computerCardCheck.addEventListener("click", () => {
  if (computerCardCheck.checked) {
    player.showComputer = true;
  } else {
    player.showComputer = false;
  }
});
// End Options checkbox
const winLose = document.getElementById("winner");
winLose.addEventListener("click", () => {
  winLose.classList.remove("fade-in");
  setTimeout(() => {
    winLose.classList.remove("show");
  }, 1000);
});

function winnerUI(win) {
  winLose.classList.add("show");
  setTimeout(() => {
    winLose.classList.add("fade-in");
  }, 500);
  if (win == "win") {
    winLose.innerHTML = "You Win!";
  } else if (win == "lose") {
    winLose.innerHTML = "Computer Wins!";
  } else if (win == "winGame") {
    winLose.innerHTML = "'One, Less than Ten', you win the Game!";
    winLose.innerHTML += `<button onClick="resetAll">Restart</button>`;
  } else if (win == "loseGame") {
    winLose.innerHTML = "'One, Less than Ten', you lose the Game!";
    winLose.innerHTML += `<button onClick="resetAll">Restart</button>`;
  } else if (win == "6wins") {
    winLose.innerHTML += " You won 6 throws, you win the Game!";
    winLose.innerHTML += `<button onClick="resetAll">Restart</button>`;
  } else if (win == "6loss") {
    winLose.innerHTML += " You lost 6 throws, you lose the Game!";
    winLose.innerHTML += `<button onClick="resetAll">Restart</button>`;
  } else {
    winLose.innerHTML = "Its a tie!";
  }
}
//game logic
function winner() {
  let a = Number(player.playerCard);
  let b = Number(player.computerCard);
  console.log("player threw " + a + " | computer threw " + b);
  if (a < b) {
    // console.log("a less than b");
    if (a == 1 && b == 10) {
      //a wins the GAME!
      // console.log("a = 1 b = 10");
      player.winGame = true;
      winnerUI("winGame");
    } else if (a + b == 9) {
      //a wins the round
      // console.log("a + b == 9");
      player.win = true;
      player.winCount++;
      winnerUI("win");
    } else if (a + b == 11) {
      //a wins the round
      // console.log("a + b == 11");
      player.win = true;
      player.winCount++;
      winnerUI("win");
    } else {
      //b is higher, b wins the round unless
      // console.log("b is greater");
      player.win = false;
      player.loseCount++;
      winnerUI("lose");
    }
  } else if (a > b) {
    // console.log("a greater than b");
    if (b == 1 && a == 10) {
      //b wins the game!
      player.loseGame = true;
      winnerUI("loseGame");
    } else if (b + a == 9) {
      //b wins the round
      // console.log("b + a == 9");
      player.win = false;
      player.loseCount++;
      winnerUI("lose");
    } else if (b + a == 11) {
      //b wins the round
      // console.log("b + a == 11");
      player.win = false;
      player.loseCount++;
      winnerUI("lose");
    } else {
      //a is higher, a wins the round unless
      // console.log("a is greater");
      player.win = true;
      player.winCount++;
      winnerUI("win");
    }
  } else {
    //its a draw, lose card
    console.log("= tie =");
    cards[b].computerHasPlayed = true;
    updateComputerHand();
    let removeCard = document.getElementById(a);
    removeCard.remove();
    winnerUI("tie");
  }
  //determine winner
  if (player.winCount > 5) {
    player.winGame = true;
    winnerUI("6wins");
  } else if (player.loseCount > 5) {
    player.loseGame = true;
    winnerUI("6loss");
  }
}
// End Game logic
document.addEventListener(
  "dblclick",
  () => {
    // console.log(player.gamblingRule);
    // console.log(player.showPlayer);
    // console.log(player.showComputer);
  },
  false
);

/* I, literaly, in a dream, made a game up called: 1, Less Than 10.
rules for 1, <10
like a game of roshambo,
player vs player use one hand counting signs
higher number wins unless +/- == 9 || sum > 10 - 10 == 1.(i later realized this is just 11)
ties remove number from game, cannot be played again.
play a number of rounds until a clear winner, or 1 beats 10.
optional rule; once you play a number cannot play again.

1 beats 8,10 wins 2/9 22%
2 beats 1,7,9 wins 3/9 33%
3 beats 1,2,6,8 wins 4/9 44%
4 beats 1,2,3,5,7 wins 5/9 55%
5 beats 1,2,3,6 wins 4/9 44%
6 beats 1,2,4 wins 3/9 33%
7 beats 1,3,5,6 wins 4/9 44%
8 beats 2,4,5,6,7 wins 5/9 55%
9 beats 1,3,4,5,6,7,8 wins 7/9 77%
10 beats 2-9 wins 8/9 88%

*/
