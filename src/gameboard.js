import {Ship} from './ship.js';
class Gameboard{
    constructor(){
        const grid = [];
        for (let i = 0; i < 10; i++) {
            grid.push(new Array(10).fill(null));
        }
        this.board = grid;
        this.Ship =[];
    }
    placeShip(ship , row ,column , isvertical){
        if(board[row][column] === null){
            if(isvertical ){
                if(column + ship.length> 10){
                    return false;
                }
                for(let i=0; i<ship.length;i++){
                    if(this.board[row][column + i] !== null){
                        return false;
                    }
                    this.board[row][column+i] = ship;
                }
                }
                else{
                    if(row+ ship.length > 10){
                        return false;
                    }
                    for(let i=0; i<ship.length;i++){
                        this.board[row+i][column]=ship;
                    }
                }
            }
        }
}