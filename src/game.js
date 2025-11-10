import { Gameboard} from "./gameboard";
import { Ship } from "./ship.js";
import {player, computer} from './Player.js';
computer.placement();
let current = 'player';
export function turn(row, column){
    const final = player.attack(computer , row, column);
    if(computer.board.gameOver()=== true){
        console.log('the computer loses');
        return;
    }
    if(current === 'player'){
       current = 'computer'; 
    }
   setTimeout(() => {if(player.board.gameOver()!==true && current ==='computer' ){
        computer.attack(player);
        current = 'player';
        if(player.board.gameOver()===true){
            console.log('the computer wins');
        }
    }}, 1000); 
}

export function gameReset(player, computer, current){
    computer.board = new Gameboard();
    computer.attacked = [];
    player.board= new Gameboard();
    current = 'player';
    return current;

}
