import { Player } from "./player";

export class GameController{
    constructor(){
        this.botPlayer=new Player(true)
        this.realPlayer=new Player()
        this.currentPlayer=this.realPlayer
        this.placeShips()
    }
     createPlayer(isBot=false){
        return new Player(isBot)
    }
    placeShips(){        
        this.botPlayer.gameBoard.place('ca', 'x', 0, 0); // Carrier length 5   
        this.botPlayer.gameBoard.place('b',  'y', 2, 4); // Battleship length 4
        this.botPlayer.gameBoard.place('cr', 'x', 5, 2); // Cruiser length 3
        this.botPlayer.gameBoard.place('s',  'y', 7, 7); // Submarine length 3
        this.botPlayer.gameBoard.place('d',  'x', 9, 5); // Destroyer length 2
    
        // Bot Player ship placement
        this.realPlayer.gameBoard.place('ca', 'y', 0, 9); // Carrier
        this.realPlayer.gameBoard.place('b',  'x', 3, 1); // Battleship
        this.realPlayer.gameBoard.place('cr', 'y', 6, 4); // Cruiser
        this.realPlayer.gameBoard.place('s',  'x', 8, 0); // Submarine
        this.realPlayer.gameBoard.place('d',  'y', 1, 7); // Destroyer

    
    }
    attachEventListener(){
        const cells=Array.from(document.querySelectorAll('.cell'))
        cells.forEach(cell=>{
            cell.addEventListener('click',()=>{
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

}