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

let board = new BoardSize('small', 12, 10);
let gameStartTime = null;
let gameEndTime = null;
let moves = 0;

//let clickingEnabled = false

function initializeGame() {
    gameStartTime = null
    gameEndTime = null
    moves = 0
    matchedCards = []
    //clickingEnabled = true

    const movesCounter = document.getElementById('movesCounter')
    movesCounter.textContent = `0/${board.moves}`

    createGameBoard()
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


 function handleCardClick(event){
    console.log(event)
   const clickedCard = event.target

   
   if (!clickedCard.classList.contains('clicked') && !clickedCard.classList.contains('secondFlippedCard')){
    clickedCard.classList.add('clicked')
    showCard(clickedCard)
    console.log(clickedCard)
   } 
   if(!firstFlippedCard){
    firstFlippedCard = clickedCard;
    clickedCard.classList.add('firstFlippedCard')
    console.log(firstFlippedCard)
   } else {
    const secondFlippedCard = clickedCard
    clickedCard.classList.add('secondFlippedCard')

    const icon1 = firstFlippedCard.querySelector('.card-icon').classList.value
    const icon2 = secondFlippedCard.querySelector('.card-icon').classList.value

    if (icon1 === icon2){
        matchedCards.push(icon1, icon2)
    } else {
        
        setTimeout(() => {
            firstFlippedCard.classList.remove('clicked')
            secondFlippedCard.classList.remove('clicked')
            firstFlippedCard = null
            secondFlippedCard = null
        }, 900)
    }
    firstFlippedCard = null
   }
 }
 
 function showCard(card){
    card.classList.add('flipped')
 }

 function hideCard(){
    card.classList.remove('flipped')
 }
 


//     clickingEnabled = true
//     if (clickedCard = contains(card) && !firstFlipped && !secFlippedCard){
//      clickedCard.classList.add('clicked')

//     } else if (clickedCard = clicked & !firstFlipped && !secFlippedCard){
//     clickedCard.classList.add('firstFlipped')

//   } else {
//         clickedCard.classList.add('secondFlippedCard')
//             //if(firstFlipped.card-icon = secFlippedCard.card-icon)
//             console.log(firstFlipped.card-icon)
//         }
    

   

// function startTimer() {
//     gameStartTime = new Date().getTime()

// }

// function stopTimer() {
//     gameEndTime = new Date().getTime()
// }

// function calculateTimeTaken() {
//     return (gameEndTime - gameStartTime) / 1000
// }

// function calculateScore() {
//     const timeTaken = calculateTimeTaken()
//     let score = 0;

//     if (timeTaken < 45) {
//         score += 2000
//     } else if (timeTaken < 90) {
//         score += 1000
//     } else {
//         score += 500
//     }
//     return score
// }


// function resetGame() {
//     gameStartTime = null;
//     gameEndTime = null;
//     moves = 0;
//     matchedCards = []

//     // updates moves counter in html
//     const movesCounter = document.getElementById('movesCounter')
//     movesCounter.textContent = `0/${board.moves}`

//     createGameBoard(); // Recreate the game board after resetting
//     stopTimer() // Stop timer if it is still runnning
// }


// // variabbles to keep track of game state
// let flippedCard = null
// let secondFlippedCard = null
// let matchedCards = [] // array  to store matched cards

// function incrementMovesCount() {
//     moves++

//     //update moves counter in html
//     const movesCounter = document.getElementById('movesCounter')
//     movesCounter.textContent = `${moves}/${board.moves}`

//     if (moves >= board.moves) {
//         endGame(calculateScore(), calculateTimeTaken(), true)
//     }
// }

// function enableClick() {
//     clickingEnabled = true;
// }

// function disableClick() {
//     clickingEnabled = false;
// }


// //function to handle click event


// function resetflippedCards() {
//     const flipped = document.querySelectorAll('.card.flipped')
//     flipped.forEach(card => {
//         card.classList.remove('flipped')
//     })
// }

// function doCardsMatch(flippedCard, secondFlippedCard) {
//     const iconClass1 = flippedCard.querySelector('.card-icon')?.classList
//     const iconClass2 = secondFlippedCard.querySelector('.card-icon')?.classList

//     // check if both cards have the same icon class
//     if (iconClass1 && iconClass2) {
//         const card1 = Array.from(iconClass1).find(icon => icons.includes(icon))
//         const card2 = Array.from(iconClass2).find(icon => icons.includes(icon))

//         return card1 === card2
//     }
//     resetflippedCards()
// }

// function showCard(card) {
//     card.classList.add('flipped')
// }

// function hideCard(card) {
//     if (card && card.classList('flipped')) {
//         card.classList.remove('flipped')
//     }
// }



// function markAsMatched(card1, card2) {
//     card1.classList.add('matched')
//     card2.classList.add('matched')
// }

// function endGame(score, timeTaken, ranOutOfMoves) {
//     if (ranOutOfMoves) {
//         const restart = confirm('Game Over: Ran out of moves. Try again ?')

//         if (restart) {
//             resetGame()
//         } else {
//             endGameMessage.innerHTML = "Thank you for playing Matchem!"
//         }
//     } else {
//         const restart = confirm(`Congratulations! You cleared the board in ${timeTaken}.
//             Your Score is ${score}. Play again?`)

//         if (restart) {
//             resetGame()
//         } else {
//             endGameMessage.innerHTML = "Thank you for playing Matchem!"
//         }
//     }
// }



// // Example event listeners for reset and start buttons 
// document.getElementById('resetBtn').addEventListener('click', resetGame); // Reset button event
// document.getElementById('startBtn').addEventListener('click', startGame); // Start button event


// initialize game
window.onload = function () {
    initializeGame()
}

