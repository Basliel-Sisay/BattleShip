import { Gameboard } from "./gameboard.js";
import { computer, player } from "./Player";
import { turn } from "./game.js";
function display(board, show){ // board is the instance of Gameboard that got like the game state
    if(show === undefined){// show is the variable that shows ships basically it is true for player board and false for the computer board
        show = true; //the ships will be visisble
    }
    const container = document.querySelector('#gameHolder');//this is just what we will have in our html file in the future
    container.innerHTML =''; // clear our container to not overlap or stack many boards on top of each other we will clear it
    for(let row = 0; row<10;row++){// loop through the grid
        for(let column =0; column<10;column++){
            const box = document.createElement('div');// a div container that represent one box on the board
            box.classList.add('box'); // this is added to later style it in our css file
            box.dataset.row = row; // we will attach data-row and column attributes to the box like (<div class="box" data-row="3" data-col="7"></div>)
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
