import { Ship } from '../src/ship.js';
import { Gameboard } from '../src/gameboard.js';
// This desctibe function helps to group all tests related to one class.
describe('Gameboard',function(){
// We first initialize our gameboard
  let myBoard;
  let myShip;
  beforeEach(function(){
    // Assign our board with instance of Gameboard class.
    //Assign our ship with instance of Ship class that takes a length parameter.
    myBoard= new Gameboard();
    myShip=new Ship(4);
  })


  // Test 1:Checks that when we initialize our Gameboard instance,it creates an empty 10 x10 board.
  test('Checks if an empty 10 x 10 board is created',function(){
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            expect(myBoard.board[i][j]).toBe(null);
        }
    }
  });


  // Test 2:Checks that when we place our ships if we enter an out of bound row or column it returns false.
  test('Checks if it returns false when we try to place ships ot of bound.',function (){
    expect(myBoard.placeShip(myShip,11,2,true)).toBe(false);
  });


  // Test 3:Checks if we can successfully place our ships vertically.
  test('Checks if placing a ship vertically works.',function (){
    myBoard.placeShip(myShip,1,1,true);
    //If we have placed the ship vertically the consecutive four cells in the same column as our starting column
    // must be occupied. 
    // For example myBoard.placeShip(myShip,1,1,true) in our case myShip has length of four so
    // the cells (1,1)(2,1)(3,1)(4,1) mus be occupied by our ship.
    for(let i=0;i<myShip.length;i++){
        expect(myBoard.board[1+i][1]).toEqual(myShip);
    }
  });


  //Test 4:Checks if we can successfully place our ships horizontally.
  test('Checks if placing a ship horizontally works.',function (){
    myBoard.placeShip(myShip,1,1,false);
    //If we have placed the ship horizontally the consecutive four cells in the same row as our starting row
    // must be occupied. 
    // For example myBoard.placeShip(myShip,1,1,false) in our case myShip has length of four so
    // the cells (1,1)(1,2)(1,3)(1,4) mus be occupied by our ship.
    for(let i=0;i<myShip.length;i++){
        expect(myBoard.board[1][1+i]).toEqual(myShip);
    }
  });


  //Test 5: Checks if false is returned when overlapping of ships occurs.
  test('Checks if false is returned in case of overlapping of ships',function (){
    // We place our ship horizontally from (1,1) to (1,4).
    myBoard.placeShip(myShip,1,1,false);
    //Trying to place our ship at (1,3) should return false.
    expect(myBoard.placeShip(myShip,1,3,true)).toBe(false);
  });


  //Test 6: Checks if attacking at an out of bound coordinates returns false.
   test('Checks if it returns false when we try to attack  out of bound.',function (){
    expect(myBoard.attack(11,2)).toBe(false);
  });


  //Test 7: Checks if false is returned if an attack was already made at that point inorder not to repeat it.
  // and if the new attack is recorded properly in our allAttack array.
   test('Checks if false is returned if an attack was already made at that point amd if the new attack is recorded successfully',function (){
     //We first place the ship vertically starting from (1,5) to (4,5).
     myBoard.placeShip(myShip,1,5,true) ;
     // We the attack at the (1,3) coordinate.
     myBoard.attack(1,5);
     //We expect allAttack array to contain {'row':1,'column':5}.
     //And for our second attack at the same spot to return false.
     expect(myBoard.allAttack).toContainEqual({'row':1,'column':5});
     expect(myBoard.attack(1,5)).toBe(false);

  })
  //Test 8: Checks if a missed attack is recorded correctly in the missed array and false is returned.
  test('Checks if a missed attack is recorded correctly and false is returned.',function (){
    myBoard.attack(2,3);
    expect(myBoard.missed).toContainEqual({'row':2,'column':3});
    expect(myBoard.attack(2,3)).toBe(false);
  });


  //Test 9: Checks if a succesful attack is recorded succesfully in the ship and true is returned.
  test('Checks if a succesful attack is recorded succesfully and true is returned.',function (){
    //We first place the ship horizontally starting from (1,2) to (1,5).
    //and place a second ship verically from (3,1) to (6,1)
    myBoard.placeShip(myShip,1,2,false) ;
    myBoard.placeShip(myShip,3,1,true) ;
    // We the attack at the (1,3) coordinate.
    // When we attack this ship its hits variable mus increment by 1
    // Its currently 0 so it must increase to 1.
    myBoard.attack(1,3);
    expect(myBoard.board[1][3].hits).toBe(1);
    //We attack the second ship and ecpect true to be returned.
    expect( myBoard.attack(3,1)).toBe(true);
  });


  //Test 10: Checks the status of  the game.
  test('Checks if true is retuned if the game is over.',function(){
    //Lets first place our ship vertically from (1,1) to (4,1).
    myBoard.placeShip(myShip,1,1,true);
    // Lets then attack all ships.
    myBoard.attack(1,1);
    myBoard.attack(2,1);
    myBoard.attack(3,1);
    myBoard.attack(4,1);

    expect(myBoard.gameOver()).toBe(true);
  });

//Test 11: Checks the status of  the game.
  test('Checks if false is returned if the game is not over.',function(){
    //Lets first place our ship vertically from (1,1) to (4,1).
    myBoard.placeShip(myShip,1,1,true);

    // Lets then attack some ships.
    myBoard.attack(1,1);
    myBoard.attack(2,1);
    myBoard.attack(3,1);

    expect(myBoard.gameOver()).toBe(false);
  });
});
