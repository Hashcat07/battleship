import { GameBoard } from "./gameBoard";

export class Player{
    constructor(isBot= false){
        this.bot=isBot
        if(bot===true) this.gameBoard=new GameBoard('Bot')
        else
        this.gameBoard = new GameBoard('Player')
    }
    makeMove(){
        if(!this.bot)return 

        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        return [x,y]
    }
}