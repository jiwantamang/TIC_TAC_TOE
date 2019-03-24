import { Square } from '../models/square';

export class SelectionAlgorithm {
    squares: Square[] = [];
    constructor(squares){
        this.squares = squares;
    }

    getMovePositin(){
        // apply your own algorithm
        let index = this.getRandom(this.squares.length);
        
        return this.squares[index];
    }

    getRandom(max){
        return  Math.floor(Math.random() * Math.floor(max));

        // check if random numbers falls under availab;e index or not         
    }
    
}
