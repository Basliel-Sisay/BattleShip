import { Ship } from '../src/ship.js';
//describe basically takes the class name 
describe('Ship', function(){
    //initialize ships to store the methods for testing
    let ships;
    //beforeEach runs the code every time
    beforeEach(function(){
        //assign our initialized ships with instance of Ship class that take 3 length
        ships = new Ship(3);
    });
    //access the methods using ships and check if hits is zero before it actually got hit
test('check if the ship hits actually starts at 0', function(){
    expect(ships.hits).toBe(0);
});
//call hit method once which means it is hitted one time and the value of hits just gets incremented
test('check if the hits increment after getting hit', function(){
    //we call the hit method here to actually test and hit one length
    ships.hit();
    expect(ships.hits).toBe(1);
});
//checks if the length in the instance is actually 3
test('check if the ship have valid length', function(){
    expect(ships.length).toBe(3);
});
//checks if the ship is sunk before getting hit by calling the method sunk and return false because it didn't
test('check if the ship is already sunk before starting the game', function(){
    expect(ships.sunk()).toBe(false);
});
test('check if the ship sinks after getting hit the length times', function(){
    //calling hit method 3 times because our length is 3 and after the hit count is equal or greater than length the ships will sink and the game will be over
    ships.hit();
    ships.hit();
    ships.hit();
    //return true because it got hit 3 times , it is 3 because in our instance we said new Ship(3) so the length in our test case is 3
    expect(ships.sunk()).toBe(true);
});
});