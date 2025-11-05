import Gameboard from './gameboard.js';
const player={
    board : new Gameboard(),
    attack(computer , row, column){
        return computer.board.attack(row,column);
    }
};
const computer ={
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
    }
}