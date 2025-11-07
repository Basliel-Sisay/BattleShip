import { Gameboard} from "./gameboard";
import { Ship } from "./ship";
import {player, computer} from './Player.js';
let current = 'player';
function turn(row, column){
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