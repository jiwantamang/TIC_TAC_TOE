import { Component, OnInit } from '@angular/core';
import { AppContext } from '../services/app.context';
import { Context } from '../models/context.model';
import { Square } from '../models/square';
import { SelectionAlgorithm } from '../utils/selection.algo';

@Component({
  selector: 'app-gameview',
  templateUrl: './gameview.component.html',
  styleUrls: ['./gameview.component.css']
})
export class GameviewComponent implements OnInit {
  context: Context;


  inProgress = true;
  winner = null; // "o" or "X"  
        //this.afterTurn = Game.X;
  movesMade = 0;
  squares: Square[] = [];
  remainingSquares = this.squares;

  O: string ="O";
  X: string ="X";

  currentTurn: string;
  constructor(
    private appContext: AppContext
  ) {     
    this.currentTurn = this.O;
  }

  ngOnInit() {
    this.appContext.contextObservable$.subscribe(
      context => {
        this.context = context;
      }
    );

    for(let i=0; i<9; i++){
      this.squares.push(new Square(i,false,false, null));
    }
  }

  makeMove(square)
    {
        //if(this.currentTurn = Game.O && square.isChoosed) return;
        
        if(square.isChoosed) return;

        let i = square.value;
        console.log("Index",i);
        if(this.inProgress){
            console.log(this.squares);
            this.squares[i].owner = this.currentTurn;
        
            console.log("Checking owner of move", this.squares[i].owner)

            this.movesMade++;
            this.checkForWinner();  
            this.squares[i].isChoosed = true;          
            this.currentTurn = this.updateCurrentTurn();
            
            // find not choosed squares
            
            this.remainingSquares = this.squares.filter(s => !s.isChoosed);
            
            if(this.currentTurn == this.X && this.context.gameMode != 'human'){
                this.makeOponentMove();
            }                
        }
        
    }

    updateCurrentTurn(){
        console.log("Current turn", this.currentTurn);
        return (this.currentTurn === this.O) ? this.X : this.O;
    }

    makeOponentMove(){
        let square = new SelectionAlgorithm(this.remainingSquares).getMovePositin();
        
        this.makeMove(square);
    }
    
   
    
    checkForWinner()
    {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
         winningCombinations.forEach((wc)=>
         {
            
            const[a,b,c]=wc;
            const sqA= this.squares[a];
            const sqB= this.squares[b];
            const sqC= this.squares[c];

            //console.log("Combination",sqA);
            
            if(sqA.owner && sqA.owner === sqB.owner && sqA.owner === sqC.owner){
                this.inProgress = false;
                this.winner = sqA.owner;
                sqA.isHighlighted = sqB.isHighlighted=sqC.isHighlighted= true;
            }
        });
            //check for tie
            if(this.movesMade === this.squares.length){
                this.inProgress=false;//no winner
            }
    }
  
}
