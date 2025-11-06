import { Gameboard } from '../src/gameboard.js'
import {player} from '../src/Player.js'
import { computer } from '../src/Player.js';
import {Ship} from '../src/ship.js'

describe('Player',function(){

   test(' Check that player has a gameboard.',()=>{
    expect(player.board).toBeInstanceOf(Gameboard);
   });


   test('Check that the player attack method calls compuers board correctly',function(){
    const mock=jest.spyOn(computer.board,'attack');
    player.attack(computer,1,1)
    expect(mock).toHaveBeenCalledWith(1,1);
   })
   test('test if the player\'s attack return the correct result' , ()=>{
      const mock = jest.spyOn(computer , 'placement');
      computer.placement();
      expect(mock).toHaveBeenCalled();
   });
   test('test that overlapping won\'t occur', ()=>{
      computer.attack(player);
      computer.attack(player);
      computer.attack(player);
      expect(computer.attacked.length).toBe(3);
   })
});

//npm test Player.spec.js