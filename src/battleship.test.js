import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";

describe('ship test',()=>{
    let ship
    beforeEach(()=>{ship=new Ship(3)})
    test ('ship hit test',()=>{    
        ship.hit()
        expect(ship.damage).toBe(1)
        
    })
    test('ship sunk test',()=>{
        ship.hit()
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.sunk).toBe(true)
    })
})

describe('Gameboard Place test',()=>{
    let gameBoard
    beforeAll(()=>{gameBoard=new GameBoard('test')})
    test('place ships',()=>{
        expect(gameBoard.place('ca',"x",2,0)).toBeTruthy()
    })
    test('place ships(false)',()=>{
        expect(gameBoard.place('ca','y',2,4)).toBeFalsy()
    })
   
})

describe('Gameboad Recieve Hit test',()=>{
    let gameBoard
    beforeAll(()=>{gameBoard=new GameBoard('test')
        gameBoard.place('ca',"x",2,0)
    })
     test('Attck ships',()=>{
        
        expect(gameBoard.recieveAttack(2,0)).toBe('Hit')
    })
    test('Attack ships (false)',()=>{
        expect(gameBoard.recieveAttack(3,0)).toBe('Miss')
    })
    test('Attack Ships (outOfBound)',()=>{
        expect(gameBoard.recieveAttack(11,0)).toBe('Out of Board')
        expect(gameBoard.recieveAttack(0,11)).toBe('Out of Board')
    })
    test('Attack already attacked target',()=>{
        gameBoard.recieveAttack(2,0)
        expect(gameBoard.recieveAttack(2,0)).toBe('already attacked')
    })
})