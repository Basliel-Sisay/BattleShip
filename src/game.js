import { Gameboard} from "./gameboard";
import { Ship } from "./ship.js";
import {player, computer} from './Player.js';
computer.placement();
// I exported current because we use it in dom.js.
export let  current = 'player';
// Changed turn function to accept a callback function that takes 'player' if plaer won
//'computer' if computer won and null if the game continues because thia is what we will use to check gameOver in dom.js.
//our previous turn() function returned from inside of the setTimeOut() which causes error.

export function turn(row, column,callback){
    const final = player.attack(computer , row, column);
    if(computer.board.gameOver()=== true){
        callback('player');
        return;
    }
    
       current = 'computer'; 

   setTimeout(() => {if(player.board.gameOver()!==true && current ==='computer' ){
        computer.attack(player);
        current = 'player';
        if(player.board.gameOver()===true){
            callback('computer');
        }else{
            callback(null);
        }
    }}, 1000); 
}
// gameReset used to take parameters but now it doesnt needd them it simply resets the objects imported.
export function gameReset(){
    computer.board = new Gameboard();
    computer.attacked = [];
    computer.placement();
    player.board= new Gameboard();
    current = 'player';
}
