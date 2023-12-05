// const variables
class BoardSize {
    constructor(size, numCards, moves) {
        this.size = size;
        this.numCards = numCards;
        this.moves = moves;
    }
}

const icons = [
    'fa-dog', 'fa-cat', 'fa-fish', 'fa-hippo', 'fa-horse', 'fa-frog',
    'fa-dog', 'fa-cat', 'fa-fish', 'fa-hippo', 'fa-horse', 'fa-frog'
];

let board = new BoardSize('small', 12, 20);
let moves = 0;
let clickingEnabled = true
let previewShown = false



function initializeGame() {
    // gameStartTime = null
    // gameEndTime = null
    moves = 0
    matchedCards = []
    clickingEnabled = false
    previewShown = false
    //console.log('clicking Enabled', clickingEnabled)

    const movesCounter = document.getElementById('movesCounter')
    movesCounter.textContent = `0/${board.moves}`

    createGameBoard()
    stopTimer() //if still running
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffleIcons = shuffleArray(icons.slice(0, board.numCards));

    gameBoard.innerHTML = ''; // Clear the game board before creating new cards

    shuffleIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', icon, 'card-icon');
        card.appendChild(iconElement);

        // Add click event listener to each card
        card.addEventListener('click', handleCardClick)

        gameBoard.appendChild(card);
    });
}
let firstFlippedCard = null
let secondFlippedCard = null

function handleCardClick(event) {
    if(!clickingEnabled ){
        return
    }
    // console.log(event)
    const clickedCard = event.target

    clickingEnabled = true
    if (!clickedCard.classList.contains('clicked') && !clickedCard.classList.contains('secondFlippedCard') && (!clickedCard.classList.contains('matched'))) {
        clickedCard.classList.add('clicked')
        showCard(clickedCard)
        
    }
    if (!firstFlippedCard) {
        firstFlippedCard = clickedCard;
        clickedCard.classList.add('firstFlippedCard')
        
    } else {
        incrementMovesCount()
        secondFlippedCard = clickedCard
        clickingEnabled = false
        clickedCard.classList.add('secondFlippedCard')

        const icon1 = firstFlippedCard.querySelector('.card-icon').classList.value
        const icon2 = secondFlippedCard.querySelector('.card-icon').classList.value

        if (icon1 === icon2) {
            matchedCards.push(icon1, icon2)
            firstFlippedCard.classList.add('matched')
            secondFlippedCard.classList.add('matched')
            console.log(firstFlippedCard)
            console.log(secondFlippedCard)
            // matchedCards.classList.add('matched')
            firstFlippedCard = null
            secondFlippedCard = null
            clickingEnabled = true
            
            if(matchedCards.length === board.numCards){
                endGame(calculateScore(), calculateTimeTaken(), false)
            }
        } else {

            setTimeout(() => {
                firstFlippedCard.classList.remove('clicked', 'firstFlippedCard')
                secondFlippedCard.classList.remove('clicked', 'secondFlippedCard')
                firstFlippedCard = null
                secondFlippedCard = null
                clickingEnabled = true
            }, 500)
        }
    }
}

function showCard(card) {
    card.classList.contains('clicked')
}

function incrementMovesCount() {
    moves++

    //update moves counter in html
    const movesCounter = document.getElementById('movesCounter')
    movesCounter.textContent = `${moves}/${board.moves}`

    if (moves >= board.moves) {
        endGame(calculateScore(), calculateTimeTaken(), true)
    }
}


function startTimer() {
   gameStartTime = new Date().getTime()
}

function stopTimer() {
    gameEndTime = new Date().getTime()
}

function calculateTimeTaken() {
    return (gameEndTime - gameStartTime) / 1000;
}

function calculateScore() {
    const timeTaken = calculateTimeTaken()
    const movesPenalty = moves * 10;
    
    let score = 0;

    if (timeTaken < 90) {
        score += 2000
    } else if (timeTaken < 120) {
        score += 1000
    } else {
        score += 500
    }
    
    // add points for matching all cards and subtract moves penalty
    score += 3000 - movesPenalty

    if (score < 0) {
        score = 0
    }

    return score
}

function previewCardsAtStart(){
    clickingEnabled = false

    const allCards = document.querySelectorAll('.card')

    allCards.forEach(card => {
        card.classList.add('clicked')
    })

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('clicked')
        })
        clickingEnabled = true
    }, 1000)
}


function startGame(){
    clickingEnabled = true
    startTimer()
    
    if (!previewShown) {
        previewCardsAtStart()
        previewShown = true
    }
}

function endGame(score, timeTaken, ranOutOfMoves) {
    stopTimer()
    clickingEnabled = false

    const modal = document.getElementById('modal')
    const modalMessage = document.getElementById('modalMessage')
    
    if (ranOutOfMoves) {
        modalMessage.textContent= 'Game Over: Ran out of moves. Play again ?'
    } else {
        modalMessage.textContent = `Congratulations! You cleared the board! Your Score is ${score}. Play again?`
    }
    modal.showModal()
}


// event listeners for game reset and start buttons 
document.getElementById('resetBtn').addEventListener('click', initializeGame); // Reset button event
document.getElementById('startBtn').addEventListener('click', startGame); // Start button event

// evemt listeners for modal buttons
//const modal = document.getElementById('modal')
const resetButton = document.querySelector('.reset-btn')
const closeButton = document.querySelector('.close-btn')

// function for modal buttons
resetButton.addEventListener('click', function () {
    initializeGame();
    modal.close(); // Close the modal after resetting the game
});

closeButton.addEventListener('click', function() {
    modal.close() // close modal without reseting game
});


// initialize game
window.onload = function () {
    initializeGame()
};