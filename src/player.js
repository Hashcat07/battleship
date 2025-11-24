import { GameBoard } from "./gameBoard";

export class Player {
  constructor(isBot = false) {
    this.bot = isBot;
    if (this.bot === true) this.gameBoard = new GameBoard("Bot");
    else this.gameBoard = new GameBoard("Player");
  }
  makeMove() {
    if (!this.bot) return;

    let xAxis = Math.floor(Math.random() * 10);
    let yAxis = Math.floor(Math.random() * 10);
    if (
      this.gameBoard.missedShots.some(([x, y]) => x === xAxis && y === yAxis) &&
      this.gameBoard.hitShots.some(([x, y]) => x === xAxis && y === yAxis)
    )
      return this.makeMove();
    else return [xAxis, yAxis];
  }
}
