import { Gameboard } from "./gameboard.js";
import { computer, player } from "./Player";
import { turn,current,gameReset } from "./game.js";
function display(board,containerId, show){ 
    if(show === undefined){// show is the variable that shows ships basically it is true for player board and false for the computer board
        show = true; //the ships will be visisble
    }
    const container = document.querySelector(containerId);//this is now dynamic - can be #playerBoard or #computerBoard
    container.innerHTML =''; // clear our container to not overlap or stack many boards on top of each other we will clear it
    for(let row = 0; row<10;row++){// loop through the grid
        for(let column =0; column<10;column++){
            const box = document.createElement('div');// a div container that represent one box on the board
            box.classList.add('box'); // this is added to later style it in our css file
            box.dataset.row = row; // we will attach data-row and column attributes to the box
            //  like (<div class="box" data-row="3" data-column="7"></div>)
            box.dataset.column=column;
            const gotAttacked = board.allAttack.some(place => place.row ===row && place.column === column); // check if the box is attacked and it will return true if it does
            const gotMissed = board.missed.some(place => place.row === row && place.column === column); // check if the box is missed
            const gotShip = board.grid[row][column] !== null; //checks if there is a ship
            if(gotAttacked && gotShip){
                box.classList.add('hit'); // if the box is attacked and got ship innit make it hit
            }else if(gotMissed){
                box.classList.add('miss');// if not make it miss
            }
            else if(show == true && gotShip){ // if ship is present show the ship and the computer won't have this because we don't want to know where the ships are at unless we tried to attack it and actually got it
                box.classList.add('ship');
            }
            container.appendChild(box);
        }
    }
    
}
function movement(row , column){
    const gotAttacked = computer.board.allAttack.some(place => place.row === row && place.column === column); // check if the computer board is already got attacked and it will return true if does got attacked
    if(gotAttacked === true){
        return; //if the board is already got attacked return nothing to avoid same attack
    }
     // Used the updated turn () function that takes callback.
     // It accepts the return value announces it if there is a winner.
     // If there is no winner it shows whose turn it is and displays the boards accordingly.
    turn(row, column, (winner) => {
        if(winner) {
            showGameOver(winner);
        }
        showTurn();
        // Update both boards separately
        display(player.board, '#playerBoard', true);
        display(computer.board, '#computerBoard', false);
    });
}
function boardResponse(){
    const container = document.querySelector('#computerBoard'); //this is later in the html will contain our computer board
    container.addEventListener('click', function(e){
        const box = e.target;
        if(!box.classList.contains('box')){ // if the clicked doesn't have a class name box ignore it (see line 13 we added box class name to it)
            return;
        }
        const row = parseInt(box.dataset.row);//as the example i gave you in line 15 the dataset contain a string not a number like data-row="2" is a string
        //so what we gon do is change that string into a number because 
        // in the gameboard.js our attack method evaluates number not stings you can go back and see attack method on line 53
        const column = parseInt(box.dataset.column);
        movement(row,column); // return the changed column and row to the movement handler method
    });
}
function boardMovement(){
    display(player.board, '#playerBoard', true);//calling on the function passing the right parameter on whether to show the ships or not
    display(computer.board, '#computerBoard', false);
}
document.addEventListener('DOMContentLoaded', function(){//this will start the game after the UI is loaded
    computer.placement();//we will call placement to randomly place the computer's ships
    boardMovement();//this will make our player board to be seen and the computer to be hide when the game starts
    boardResponse();//we call on the function where we gave event listener to the computer's board container so like we can click on it and in every click movement function will run 
    // because we already called it inside the boardResponse() function with row and column
    addResetListener();
    showTurn();
})
// This function creates a dom container to show whose turn it is by using the imported current variable.
function showTurn(){
    const turnShow = document.querySelector('#turnHolder');
    turnShow.innerHTML = '';
    turnShow.textContent = `It's now ${current}'s turn`;
}
// This function accepts the return value of the turn function and if it is not null,
// it creates a dom container and announces the winner.
function showGameOver(winner){
    if (winner === 'player' || winner === 'computer') {
        const gameOverbox = document.createElement('div');
        gameOverbox.textContent = `Game Over! ${winner} has won!!!`;
        gameOverbox.classList.add('game-over-message');
        
        // Add to a central location or just one board
        const container = document.querySelector('#gameHolder'); // or use a dedicated message area
        container.appendChild(gameOverbox);
        
        // Disable further clicks on computer board only (since player can't click their own board)
        const computerContainer = document.querySelector('#computerBoard');
        computerContainer.style.pointerEvents = 'none';
    }
}

//This function adds an event listner to a button we will have in our html in the future to reset the game.

function addResetListener(){
    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', () => {
        gameReset();
        // Re-enable both boards that were disabled when game is over.
        document.querySelector('#playerBoard').style.pointerEvents = 'auto';
        document.querySelector('#computerBoard').style.pointerEvents = 'auto';
        
        showTurn();
        // Display both boards
        display(player.board, '#playerBoard', true);
        display(computer.board, '#computerBoard', false);
    });
}
