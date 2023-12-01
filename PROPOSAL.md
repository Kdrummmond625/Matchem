<h1>Project Proposal</h1>

<h2>Project choice: Matching Game</h2>

<h3>Project description</h3>

Welcome to Matchem, an online single-player game designed to challenge memory recall skills.
Players must strategically match identical icons on a board without exceeding a set number of turns. 
After completing each board, the game displays the player's score, determined by both the time taken and the number of turns used. 
Additionally, the game offers a board restart option to encourage players to aim for higher scores. 
Future plans include expanding the game with different board sizes and implementing a top scores log for each size, enhancing the competitive aspect of the gameplay.





<h3>Wire Frames</h3>

<h4>Initial Landing View</h4>

How to Play 

![img_0054](https://github.com/Kdrummmond625/Matchem/assets/150689031/d1772235-6e77-4243-9fd3-64ec511c9a69)


<h4>Results View</h4> 

How to play

![img_0053](https://github.com/Kdrummmond625/Matchem/assets/150689031/c83e1cd1-e805-494f-b235-bf9ae092b0d6)

<h2>User Stories</h2>

<h3>MVP</h3>

**Provide Initial Board Preview:** 
Implement a feature that displays an initial preview of the board when the game begins, allowing players to have a glimpse before starting.

**Identify Valid Pair Matches:**
Develop functionality that identifies and acknowledges when a valid pair of identical icons is matched by the player.

**Notify End of Game due to Turns:**
Incorporate a notification system that informs players when the game ends due to the exhaustion of all available turns.

**Display Score Information:**
Ensure that players are informed about their scores upon completing a board, factoring in time taken and turns used.

**Allow Game Restart Option:**
Provide players with the ability to restart the game at their discretion, enabling them to aim for better scores or retry challenges.

**Require Start Button Activation:**
Design the game to initiate only upon pressing a designated start button, giving players control over when the game begins.

**Optimize UI for Engaging Experience:**
Focus on creating an aesthetically pleasing and engaging User Interface (UI) to enhance the overall player experience, aiming for an immersive gameplay environment.

<h3>Stretch goals</h3>

**Incorporate Audio Throughout Gameplay:**
Enhance the gaming experience by integrating audio elements that play throughout the game, adding an immersive dimension to the gameplay.

**Implement Top 5 Scores Log:**
Develop a feature that records and displays the top 5 scores achieved by players, fostering a competitive environment and encouraging higher performance.

**Introduce Board Size Selection:**
Provide players with the flexibility to choose from various board sizes, offering different levels of difficulty and enhancing the game's versatility and challenge.

## Pseudocode 

**Initialize**

-Define variables for board size , number of icons , number of turns and score

-Initialize the board with icons

Displaying the board
	Create board object 
	Create function to preview board to the player
Game Flow
	Create button and give it a function to initate the game
	Begin game loop
		Preview board to player 5 secs
		Allow appropiate player input for selecting icons
		Check for correct pair clear from board
		Update the board display after each turn
		Reduce the turn counter and check for game completion conditions
			End game 0 turns remaing
			Board is cleared
Scoring and Feedback:
	Function to calculate scored depending of time taken and turns used
	Function to display score to the player after board completion
	Function to allow player to restart game 
End Game
	Display end of game message depending on game completion conditions	
	Display message asking if player would like to restart or exit game 
	
		
