import { Gameboard } from "./gameboard.js";
import { computer, player } from "./Player";
import { turn } from "./game.js";
function display(board,ContainersId ,show){ // board is the instance of Gameboard that got like the game state
    if(show === undefined){// show is the variable that shows ships basically it is true for player board and false for the computer board
        show = true; //the ships will be visisble
    }
    const container = document.querySelector(ContainersId);//this is just what we will have in our html file in the future
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
    turn(row , column); // now we can call turn from game.js to handle game turn logic because like we imported it at the start of the dom.js file
    const boards =[ // this is an array object that have the displaye parameters as an argument passed since we imported the gameboard
    //  we can assign the property board to a player and computer board and decide to hide the computer ships and show the player ships(in our POV) 
    // then loop throguh it to access everything
        {
            board: player.board,
            show: true
        },
        {
            board : computer.board,
            show: false
        }
    ]
    boards.forEach(access=> display(access.board , access.show));// access it through calling the display function which contain board and show parameters
}
function boardResponse(){
    const container = document.querySelector('#computerBoard'); //this is an id that will later be in the html which containes our computer board
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
})
