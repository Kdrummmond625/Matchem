
//const icons = 
const scoreElement = document.getElementById('score-display')
const timeElement = document.getElementById('time')
const movesElement = document.getElementById('moves')
const startElement = document.getElementById('startBtn')
const restartElement = document.getElementById('restartBtn')
const gameElement = document.getElementById('gameBoard')

// board size , number of icons , number of turns and score

class BoardSize {
    constructor(boardSize, cards, moves) {
    this.boardSize = boardSize
    this.cards = cards
    this.moves = moves
    }
}

let score = 0
let startTime
let gameActive = false

// Initialize the board with icons
const currentBoardSize = new BoardSize('small', 12, 9)

// function to make and display game board
function generateGameBoard(boardSize) {
    const {cards} = boardSize
    const cardContents = [ 
        
    ]

    // clear any cards inside game board
    gameBoard.innerHTML = '' 

    // create the specified number of cards
    for (let i = 0; i < cards; i++) {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        cardElement.classList.add('card')
        cardElement.innerHTML =
        `
            <div class="card-front"></div>
            <div class="card-back"></div>
        `
        gameElement.appendChild(cardElement);
    }
}
// calling function to make board
generateGameBoard(currentBoardSize);


// Create function to preview board to the player

// // Game Flow

// Create button and give it a function to initate the game

// Begin game loop

// Preview board to player 5 secs

// Allow appropiate player input for selecting icons

// Check for correct pair

// Remove pair and update the board display after each turn

// Increase the turn counter and check for game completion conditions

// End game 0 turns remaing
// Board is cleared
// Scoring and Feedback:

// Function to calculate scored depending of time taken and turns used

// Function to display score to the player after board completion

// Function to allow player to restart game

// End Game

// Display end of game message depending on game completion conditions

// Display message asking if player would like to restart or exit game