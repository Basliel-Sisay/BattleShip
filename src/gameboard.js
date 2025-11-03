import {Ship} from './ship.js';
class Gameboard{
    constructor(){
        const grid = [];
        for (let i = 0; i < 10; i++) {
            grid.push(new Array(10).fill(null));
        }
        this.board = grid;
        this.Ship =[];
        this.positions=[];
    }
    placeShip(ship , row ,column , isvertical){
        if(board[row][column] === null){
            if(isvertical ){
                if(row + ship.length> 10){
                    return false;
                }
                for(let i=0; i<ship.length;i++){
                    if(this.board[row+ i][column ] !== null){
                        return false;
                    }
                }
                for (let i = 0; i < ship.length; i++) {
                    this.board[row + i][column] = ship;
                    this.positions.push({ row: row + i, column: column });
                  }

                }
                else{
                    if(column + ship.length > 10){
                        return false;
                    }
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[row][column + i] !== null) {
                          return false; // another ship is in the way
                        }
                      }
                    for(let i=0; i<ship.length;i++){
                        this.board[row][column+i]=ship;
                        this.positions.push({ row: row, column: column + i });
                    }
                }
                return true;
            }
        }
}