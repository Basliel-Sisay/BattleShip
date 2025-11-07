import {turn , gameReset} from '../src/game.js';
import {Ship} from '../src/ship.js';
import { Gameboard} from '../src/gameboard.js';
import {player, computer} from '../src/Player.js';
test('test if the current player is player when the game starts', function(){
    expect(gameReset(player, computer, 'current')).toBe('player');
});
test('test if when the game reset\'s there is a new board created' , function(){
    expect(computer.board).toBeTruthy();
});
test('test if computer is not the stating player.', function(){
    expect(gameReset(player, computer, 'player')).not.toBe('computer');
});