import { Player } from "./player";

export class GameController{
    constructor(){
        this.botPlayer=new Player(true)
        this.realPlayer=new Player()
        this.currentPlayer=this.realPlayer
        this.placeShips()
        this.botPlace()
    }
     createPlayer(isBot=false){
        return new Player(isBot)
    }
    placeShips(type,axis,xcoords,ycoords){  
        if(this.realPlayer.gameBoard.place(type,axis,xcoords,ycoords))
            return true
        return false
    }
    attachEventListener(){
        console.log('attached')
        const cells=Array.from(document.querySelectorAll('.botBoard .cell'))
        console.log(cells)
        cells.forEach(cell=>{
            cell.addEventListener('click',()=>{
                console.log('attached')
                let xCoords= cell.dataset.row
                let yCoords=cell.dataset.column
                let result=this.sendAttack(this.currentPlayer===this.realPlayer? this.botPlayer:this.realPlayer ,xCoords,yCoords)
               console.log(result)
               console.log(cell)
            this.changeAttribute(cell,result)
                
            })
        })
    }
    sendAttack(player,xCoords,yCoords){
        let result=player.gameBoard.receiveAttack(xCoords,yCoords)
        this.checkWin(player)
        this.alternatePlayer()
        return result
    }
    alternatePlayer(){
        this.currentPlayer=(this.currentPlayer ===this.realPlayer)? this.botPlayer : this.realPlayer
        if(this.currentPlayer===this.botPlayer){
            this.botAttack()
        }
    }
    botAttack(){
            const [x,y]=this.botPlayer.makeMove()
            let result=this.sendAttack(this.realPlayer,x,y)
            let cell=document.querySelector(`[data-row="${x}"][data-column="${y}"]`)
            this.changeAttribute(cell,result)
    }
    changeAttribute(cell,result)    {
            if(result === 'Hit') {
    cell.classList.add('hit');
    cell.classList.remove('ship');
} else if(result === 'Miss') {
    cell.classList.add('miss');
} else if(result === 'already attacked') {
    cell.classList.add('red');
    setTimeout(()=>{
        cell.classList.add('miss');
        cell.classList.remove('red');
    },500);
    
}
    }
     botPlace(){
             const ships = [
                ["ca"],
                ["b"],
                ["cr"],
                ["s"],
                ["d"],
            ];
    
            ships.forEach(([type]) => {
                let placed = false;
                while (!placed) {
                    const axis = Math.random() < 0.5 ? "x" : "y";
                    const x = Math.floor(Math.random() * 10);
                    const y = Math.floor(Math.random() * 10);
                    placed = this.botPlayer.gameBoard.place(type, axis, x, y);
                }
            });
        }
    checkWin(opponent) {
        console.log(opponent.gameBoard.allSunk())
    if(opponent.gameBoard.allSunk()) {
        alert(`${this.currentPlayer === this.realPlayer ? "Player" : "Bot"} wins!`);
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
        return true;
    }
    return false;
}
reset(){
    this.realPlayer=new Player()
    this.botPlayer=new Player(true)
}

}