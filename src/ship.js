export class Ship{
    //the constructor takes a length like horizontal or vertical length where the ships are at
    constructor(length){
        this.length = length;
        this.hits = 0;    // this hits is the amount of hits it takes to make the game end      
    }
    //hit method counts the number of hits the game board takes 
    hit(){
        this.hits= this.hits + 1;
    }
    //after the length is all destoryed the ship will sink and it is game over
    sunk(){
        return this.hits >= this.length;
    }
}
