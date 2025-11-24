import { GameBoard } from "./gameBoard";
import { GameController } from "./gameController";
import { Ship } from "./ship";

export class Ui{
    constructor(){
            this.controller=new GameController()
            this.getInput()
            this.renderBoard()
            

    }
    renderBoard(){const playButton=document.querySelector('.play')
      playButton.disabled=true
        const botBoard=document.querySelector('.botBoard')
        const playerBoard=document.querySelector('.playerBoard')
        render(this.controller.botPlayer.gameBoard.board,false,botBoard)
        render(this.controller.realPlayer.gameBoard.board,false,playerBoard)
        console.log(this.controller.botPlayer.gameBoard.board)
        function render(board, hideShips, container){
          container.innerHTML=""
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
  if(this.controller.realPlayer.gameBoard.ships.length===5)
              this.startGame()
            }
        getInput(){
          const dialog=document.querySelector('dialog')
          const type=document.querySelector('select')
          const xcoords=document.querySelector('#xcoords')
          const ycoords=document.querySelector('#ycoords')
          const placeShip=document.querySelector('.placeShip')
          placeShip.addEventListener('click',()=>{
            document.querySelector('select').selectedIndex = 0;  // First option selected
            document.querySelectorAll('input[name="axis"]').forEach(r => r.checked = false); // Uncheck radios
            document.querySelector('#xcoords').value = ''; 
            document.querySelector('#ycoords').value = '';
            dialog.showModal()
          })
          const close=document.querySelector('.closeDialog')
          close.addEventListener('click',()=>{
            document.querySelector('select').selectedIndex = 0;  // First option selected
            document.querySelectorAll('input[name="axis"]').forEach(r => r.checked = false); // Uncheck radios
            document.querySelector('#xcoords').value = ''; 
            document.querySelector('#ycoords').value = '';
            dialog.close()
          })
          const submit=document.querySelector('.submit')
          submit.addEventListener('click',(e)=>{
            e.preventDefault()
            const typeValue = type.value;
            let axisValue = document.querySelector('input[name="axis"]:checked')?.value;
            const xValue = parseInt(xcoords.value);
            const yValue = parseInt(ycoords.value);

            console.log(typeValue,axisValue,xValue,yValue)
            if(this.controller.placeShips(typeValue,axisValue,xValue,yValue))
            {
              const index=type.selectedIndex
              type.remove(index)
            }
            document.querySelector('select').selectedIndex = 0;
            document.querySelectorAll('input[name="axis"]').forEach(r => r.checked = false);
            document.querySelector('#xcoords').value = ''; 
            document.querySelector('#ycoords').value = '';
            dialog.close()
            this.renderBoard()
            
        })
          }
        startGame(){
        const playButton = document.querySelector('.play');
        playButton.disabled = false;
        const playerBoard = document.querySelector('.playerBoard');
        
        playButton.addEventListener('click', () => {
            console.log('Play clicked - Step 1: Rendering boards');  // Debug log
            this.renderBoard();  // Re-render FIRST
            
            console.log('Play clicked - Step 2: Attaching listeners');  // Debug log
            this.controller.attachEventListener();  // Attach to NEW cells
            
            console.log('Play clicked - Step 3: Setting pointerEvents');  // Debug log
            // Fix: Correct selector (remove redundant '.playerBoard')
            Array.from(playerBoard.querySelectorAll('.cell')).forEach((cell) => {
                cell.style.pointerEvents = 'none';
            });
            
            console.log('Play clicked - Done');  // Debug log
        });

        }
      }


