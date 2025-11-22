import { Ship } from "./ship"
export class GameBoard{
    constructor(player){
        this.player=player
        this.board= Array.from({ length: 10 }, () => Array(10).fill(null));
        this.shipUsed=[]
        this.ships=[]
        this.missedShots=[]
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
        const ship=new Ship(shipLength)
        this.shipUsed.push(type)
        this.ships.push(ship)
        
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
            boardPosition.hit()
            return 'Hit'
        }
        else{
            this.missedShots.push([xAxis,yAxis])
            return 'Miss'
        }
    }
    allSunk(){
       return this.ships.every(ship=>
            ship.isSunk())
    }
}