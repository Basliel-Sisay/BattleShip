import {Ship} from './ship.js';
class Gameboard{
    constructor(){
        const grid = [];
        for (let i = 0; i < 10; i++) { 
            grid.push(new Array(10).fill(null));//create an array on each loop so in the first loop it will create one array with 10 elements aka new Array(10)
            //  which contains 10 elements and then fill those elements with null and the null will represent the unplaced ship 
            // if we want to place it we say like this.board[2][4] = ship(this means there will be ship on the 2nd row and the 4th column)
        }
        this.board = grid;
        this.ships =[]; //stores all the ships placed on the board
        this.positions=[];// checks the coordinate of all the ships that will be on the board
        this.missed=[]; //it tracks the missed attacks on the ships
        this.allAttack=[];// it tracks all the attacks made on the ships both missed and hit.
    }
    placeShip(ship , row ,column , isvertical){
        if(row<0 || row>=10 || column <0 || column >= 10){// it won't responed to attacks that are outside of the 10x10 grid or outside of the board
            return false;
        }
            if(isvertical ){
                if(row + ship.length> 10){ // if the ship is place at row 9 and the ship.length is like 5 it passes the limit of the 10th grid so we will restrict it
                    return false;
                }
                for(let i=0; i<ship.length;i++){
                    if(this.board[row+ i][column ] !== null){
                        return false;
                    }
                }
                for (let i = 0; i < ship.length; i++){// this makes the ship consecutive like if the length is 2, the ship can occupy spaces like 2,4 and 3,4
                    // (constant column with consecutive row)
                    this.board[row + i][column] = ship;
                    this.positions.push({ row: row + i, column: column });
                  }
                }else{
                    if(column + ship.length > 10){ // if the ship is place at column 9 and the ship.length is like 5 it passes the limit of the 10th grid so we will restrict it
                        return false;
                    }
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[row][column + i] !== null) {
                          return false; // another ship is in the way
                        }
                      }
                    for(let i=0; i<ship.length;i++){// and this makes the ship consecutive like if the length is 2, this ship can occupy spaces like 2,4 and 2,5
                        //(constant row with consecutive column)
                        this.board[row][column+i]=ship;
                        this.positions.push({ row: row, column: column + i });
    
                    }
                }
                this.ships.push(ship); //storing the placed ships
                return true; //return true for the successfully placed ships
            }
            attack(row , column){
                if(row<0 || row>=10 || column <0 || column >= 10){// it won't responed to attacks that are outside of the 10x10 grid or outside of the board
                    return false;
                }
                const target = this.board[row][column]; //stores the object at the target cell
    
                const alreadyAttacked=this.allAttack.some(attack=>
                    attack.row === row && attack.column === column
                );
                // We check the allAttack array and if our attack is in there we return false.
                if(alreadyAttacked){return false;}
                //If our attack is not in the allAttack array we push it so that it gets recorded.
                this.allAttack.push({'row':row , 'column':column});

                if(target === null){
                    // Fixed the object format cause in javascript an object must be in key:value pair;
                    // It was {row,column} before now it is {'row':row , 'column':column}
                    this.missed.push({'row':row , 'column':column});
                    
                    return false;// if there is no ship, store the missed ones and return false so that the player won't try for the missed ships again to think of it as target
                }
                target.hit();//if the ships is there and got hit return true and make it known that it actually got hit
                return true;
            }
            gameOver(){
                for(let i=0; i<this.ships.length; i++){//check all the ships and look if ships are getting sink
                    if(!this.ships[i].sunk()){
                        return false;// return false if all the ships are not sunk because the game is still not over
                    }
                }
                return true;// if all the ships are sunk then return true and call the game over 
            }
        }
        export{Gameboard};