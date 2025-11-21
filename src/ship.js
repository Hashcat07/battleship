export class Ship{
    constructor(length){
        this.length=length
        this.damage=0
        this.sunk=false
    }
    hit(){
        this.damage++
        this.isSunk()
    }
    isSunk(){
        if(this.damage>=this.length){
            this.sunk=true
        }
    }
}