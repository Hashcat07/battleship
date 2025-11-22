import { GameBoard } from "./gameBoard";

export class Player{
    constructor(isBot= false){
        if(isBot===true) this.gameBoard=new GameBoard('Bot')
        this.gameBoard = new GameBoard('Player')
    }
}