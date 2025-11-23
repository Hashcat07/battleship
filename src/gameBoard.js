import { Ship } from "./ship"
export class GameBoard{
    constructor(player){
        this.player=player
        this.board= Array.from({ length: 10 }, () => Array(10).fill(null));
        this.shipUsed=[]
        this.ships=[]
        this.missedShots=[]
        this.hitShots=[]
    }
    shipType(type){
        if(type==='d')return 2
        if(type==='s')return 3
        if(type==='cr')return 3
        if(type==='b')return 4
        if(type==='ca')return 5
    }
    place(type,axis,xAxis,yAxis){
        let shipLength=this.shipType(type);
        if(!this.shipUsed.includes(type))
    {
        if (axis === 'x' && yAxis + shipLength > 10) return false;
        if (axis === 'y' && xAxis + shipLength > 10) return false;
            for (let i = 0; i < shipLength; i++) {
        let checkX = axis === 'x' ? xAxis : xAxis + i;
        let checkY = axis === 'x' ? yAxis + i : yAxis;
        if (this.board[checkX][checkY] instanceof Ship) {
            console.log(`Overlap detected at [${checkX},${checkY}] for ${type}`);
            return false;
        }
    }
        const ship=new Ship(shipLength)
          
       if (axis==='x') { 
       
        for(let i=0;i<shipLength;i++)
         {
           
            this.board[xAxis][yAxis+i]=ship

         }
       }
       if(axis==='y'){
       for(let i=0;i<shipLength;i++)
         {
            
            this.board[xAxis+i][yAxis]=ship
         }}
        this.shipUsed.push(type)
        this.ships.push(ship)
         return true
    }
    else
    return false

    }
    receiveAttack(xAxis,yAxis){
        if(xAxis>9||yAxis>9||xAxis<0||yAxis<0)
            return 'Out of Board'
        let boardPosition=this.board[xAxis][yAxis]
        if(this.missedShots.some(([x,y])=>x==xAxis&&y==yAxis))
            return 'already attacked'
        else if(boardPosition instanceof Ship){
            this.hitShots.push([xAxis,yAxis])
            boardPosition.hit()
            return 'Hit'
        }
        else{
            this.missedShots.push([xAxis,yAxis])
            return 'Miss'
        }
    }
    allSunk(){
        console.log(this.ships)
        console.log(this.ships.every(ship=>
            ship.isSunk()))
       return this.ships.every(ship=>
            ship.isSunk())
    }
}