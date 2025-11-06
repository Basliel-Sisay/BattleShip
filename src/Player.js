import {Gameboard} from './gameboard.js';
import {Ship} from './ship.js';
export const player={
    board : new Gameboard(),
    attack(computer , row, column){
        return computer.board.attack(row,column);
    }
};
export const computer ={
    board: new Gameboard(),
    attacked:[],
    attack(player){
        let row;
        let column;
        let trial = true;
        while(trial === true){
            row = Math.floor(Math.random()*10) ;
            column = Math.floor(Math.random()*10) ;
            //so that it can hit column and rows randomly
            const move = row + ',' + column;
            trial = false;
            for (let i = 0; i<this.attacked.length; i++){
                if(this.attacked[i] === move){
                    trial = true; // we set it back tot true
                    break; // we are done here
                }
            }
        }
        this.attacked.push(row +','+ column);
        return player.board.attack(row,column);
       
    },
    placement(){
        const shiplen = [5,4,3,3,2];
        for(let i=0; i<shiplen; i++) {
            const ship = new Ship(shiplen[i]);
            let placing = false;
            while(placing === false){
                const row = Math.floor(Math.random()*10);
                const column  = Math.floor(Math.random()*10);
                const isvertical = Math.random() > 0.5;
                placing = this.board.placeShip(ship, row , column , isvertical);
            }
        }
     }
}

