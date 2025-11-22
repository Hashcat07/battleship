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
        expect(ship.isSunk()).toBe(true)
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
        
        expect(gameBoard.receiveAttack(2,0)).toBe('Hit')
    })
    test('Attack ships (false)',()=>{
        expect(gameBoard.receiveAttack(3,0)).toBe('Miss')
    })
    test('Attack Ships (outOfBound)',()=>{
        expect(gameBoard.receiveAttack(11,0)).toBe('Out of Board')
        expect(gameBoard.receiveAttack(0,11)).toBe('Out of Board')
    })
    test('Attack already attacked target',()=>{
        gameBoard.receiveAttack(2,0)
        expect(gameBoard.receiveAttack(2,0)).toBe('already attacked')
    })
})

describe('All ships sunk',()=>{
    let gameBoard
    beforeAll(()=>{
        gameBoard=new GameBoard('test')
        gameBoard.place('d','x',2,0)
    })
    test('Ships sunk test',()=>{
        gameBoard.receiveAttack(2,0)
        gameBoard.receiveAttack(2,1)
        expect(gameBoard.allSunk()).toBe(true)
    })

})