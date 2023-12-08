// class to make board sizes
class BoardSize {
    constructor(size, numCards, moves) {
        this.size = size;
        this.numCards = numCards;
        this.moves = moves;
    }
// define board sizes to player
    static getBoardSizes() {
        return [
            new BoardSize('small', 12, 16),
            new BoardSize('medium', 18, 24),
            new BoardSize('large', 24, 32),
        ];
    }
}
// define icons for cards
const icons = [
    'fa-arrow-right', 'fa-rotate-right', 'fa-arrow-up', 'fa-arrow-trend-up', 'fa-angles-left', 'fa-angles-down',
    'fa-arrow-right', 'fa-rotate-right', 'fa-arrow-up', 'fa-arrow-trend-up', 'fa-angles-left', 'fa-angles-down','fa-arrow-right', 'fa-rotate-right', 'fa-arrow-up', 'fa-arrow-trend-up', 'fa-angles-left', 'fa-angles-down',
    'fa-arrow-right', 'fa-rotate-right', 'fa-arrow-up', 'fa-arrow-trend-up', 'fa-angles-left', 'fa-angles-down'
];
// define game variables
let board;
let moves = 0;
let clickingEnabled = true;
let previewShown = false;
let firstFlippedCard = null;
let secondFlippedCard = null;
let matchedCards = [];
let clickedCards = {}
let gameStartTime = null
let gameEndTime = null 

// function to select board size
function selectBoardSize() {
    const sizes = BoardSize.getBoardSizes()
    let sizeChoice = prompt("select board size: small, medium, large")
    let chosenSize = sizes.find(size => size.size === sizeChoice)

    if (!chosenSize) {
        chosenSize = sizes[0]
    }
    board = chosenSize
}
// function to initialize game
function initializeGame() {
    moves = 0;
    matchedCards = [];
    clickingEnabled = false;
    previewShown = false;
    clickedCards = {}

    const movesCounter = document.getElementById('movesCounter');
    movesCounter.textContent = `0/${board.moves}`;

    createGameBoard();
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard() {
    const gameBoardContainer = document.querySelector('.game-board'); // Define gameBoardContainer
    const shuffleIcons = shuffleArray(icons.slice(0, board.numCards));

    //Clear the game board before creating new cards

    gameBoardContainer.innerHTML = ''; // 

    // Determine the number of columns based on the board size
    let numColumns;
    if (board.size === 'small') {
        numColumns = 4;
    } else if (board.size === 'medium') {
        numColumns = 6;
    } else if (board.size === 'large') {
        numColumns = 8;
    }

    // Set the class to control the number of columns
    gameBoardContainer.classList.add(`columns-${numColumns}`);

    shuffleIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', icon, 'card-icon');
        card.appendChild(iconElement);

        // Add click event listener to each card
        card.addEventListener('click', handleCardClick);

        //add cards to game
        gameBoardContainer.appendChild(card);
 
    });
}
    //logic to handle card clicks
function handleCardClick(event) {
    //prevent clicking if not enabled
    if (!clickingEnabled) {return};
     
    // define event target
    const clickedCard = event.target;
    
    // define clicked card
   if (!firstFlippedCard) {
    firstFlippedCard = clickedCard
    showCard(firstFlippedCard)
    clickedCard.classList.add('firstFlippedCard')
    console.log(firstFlippedCard)
   } else if (!secondFlippedCard) {
    secondFlippedCard = clickedCard
    showCard(secondFlippedCard)
    incrementMovesCount()
    clickedCard.classList.add('secondFlippedCard')
    console.log(secondFlippedCard)
   }
   clickedCard[clickedCard] = true

   // check for matches or mismatched cards
    setTimeout(() => {
        if (firstFlippedCard && secondFlippedCard) {
            if (areCardsMatching(firstFlippedCard, secondFlippedCard)) {
                handleMatchingCards(firstFlippedCard, secondFlippedCard);
            } else {
                handleMismatchedCards(firstFlippedCard, secondFlippedCard);
                clickedCard[firstFlippedCard] = false
                clickedCard[secondFlippedCard] = false
                console.log(clickedCards)
            }
        }
    }, 500); // Delay the execution by 500 milliseconds for animation
};

// determine if cards matched based on card value
function areCardsMatching(card1, card2) {
    const icon1 = card1.querySelector('.card-icon').classList.value;
    const icon2 = card2.querySelector('.card-icon').classList.value;

    return icon1 === icon2;
}
// determine if cards match 
function handleMatchingCards(card1, card2) {
    matchedCards.push(card1, card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    console.log(card1)
    console.log(card2)
// end game when all cards are matched
    if (matchedCards.length === board.numCards) {
        endGame(calculateScore(), false);
    }
// reset cards
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);

    resetFlippedCards();    
}

// if cards dont match reset cards
function handleMismatchedCards(card1, card2) {
    setTimeout(() => {
        card1.classList.remove('firstFlippedCard');
        card2.classList.remove('secondFlippedCard');
        hideCard(card1)
        hideCard(card2)
        resetFlippedCards();
    }, 500);
}

function resetFlippedCards() {
    firstFlippedCard = null;
    secondFlippedCard = null;
    clickingEnabled = true;
    clickedCards = {};
}
// function to show cards
function showCard(card) {
    card.classList.add('clicked');
    
}
// function to hide cards
function hideCard(card) {
    card.classList.remove('clicked')
}

// function to increment moves
function incrementMovesCount() {
    moves++;

    // update moves counter in HTML
    const movesCounter = document.getElementById('movesCounter');
    movesCounter.textContent = `${moves}/${board.moves}`;
// game ends if out of moves
    if (moves >= board.moves) {
        endGame(calculateScore(), calculateTimeTaken(), true);
    }
}
// function to start game timer
function startTimer() {
    gameStartTime = performance.now();
    console.log(gameStartTime)
}
// function to stop game timer
function stopTimer() {
    gameEndTime = performance.now()
    console.log(gameEndTime)
}
// function to calculate the amount of time player took to finish game
function calculateTimeTaken() {
    return Math.floor((gameEndTime - gameStartTime) / 1000);
    
}
// function to calculate score
function calculateScore() {
    const timeTaken = calculateTimeTaken();
    console.log(calculateTimeTaken)
    console.log(timeTaken)
    const movesPenalty = moves * 10;

    let score = 0;
// rule to give points depending on time taken
    if (timeTaken < 30) {
        score += 2000;
    } else if (timeTaken < 60) {
        score += 1000;
    } else {
        score += 500;
    }

    // add points for matching all cards and subtract moves penalty
    score += 3000 - movesPenalty;

    if (score < 0) {
        score = 0;
    }

    return score;
}
// function to show cards to player at the start of the game
function previewCardsAtStart() {
    clickingEnabled = false;

    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        card.classList.add('clicked');
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('clicked');
        });
        clickingEnabled = true;
    }, 2000);
}
// function to start game
function startGame() {
    clickingEnabled = true;
    startTimer();

    if (!previewShown) {
        previewCardsAtStart();
        previewShown = true;
    }
}
//function to end game
function endGame(score, ranOutOfMoves) {
    stopTimer();
    clickingEnabled = false;

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');

    console.log(ranOutOfMoves)

    if (ranOutOfMoves) {
        modalMessage.textContent = 'Game Over: Ran out of moves. Play again ?';
    } else {
        modalMessage.textContent = `Congratulations! You cleared the board! Your Score is ${score}. Play again?`;
    }
    modal.showModal();
   
    console.log(modalMessage.textContent)
}

// Event listeners for game reset and start buttons
document.getElementById('resetBtn').addEventListener('click', initializeGame); // Reset button event
document.getElementById('startBtn').addEventListener('click', startGame); // Start button event

// Event listeners for end game modal buttons
const resetButton = document.querySelector('.reset-btn');
const closeButton = document.querySelector('.close-btn');
const modal = document.getElementById('modal');

// Function for  end game modal buttons
resetButton.addEventListener('click', function () {
    selectBoardSize()
    initializeGame();
    modal.close(); // Close the modal after resetting the game
});

closeButton.addEventListener('click', function () {
    modal.close(); // Close modal without resetting the game
});

// Initialize game
window.onload = function () {
    selectBoardSize()
    initializeGame();
 
};
