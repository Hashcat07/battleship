import { GameBoard } from "./gameBoard";
import { GameController } from "./gameController";
import { Ship } from "./ship";

export class Ui{
    constructor(){
            this.controller=new GameController()
    }
    renderBoard(){
        const botBoard=document.querySelector('.botBoard')
        const playerBoard=document.querySelector('.playerBoard')
        render(this.controller.botPlayer.gameBoard.board,false,botBoard)
        render(this.controller.realPlayer.gameBoard.board,false,playerBoard)
        function render(board, hideShips, container){
            console.log(board)
        for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row=x
        cell.dataset.column=y

        const value = board[x][y];

        if (value instanceof Ship && !hideShips) {
          cell.classList.add("ship");
        }

        container.appendChild(cell);
      }
      }
  }
  this.controller.attachEventListener()
        }
    }


