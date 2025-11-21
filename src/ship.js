export class Ship{
    constructor(length,axis){
        this.length=length
        this.axis=axis
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