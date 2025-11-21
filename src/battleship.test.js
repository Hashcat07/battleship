import { Ship } from "./ship";

describe('ship test',()=>{
    let ship
    beforeEach(()=>{ship=new Ship(3,"x")})
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