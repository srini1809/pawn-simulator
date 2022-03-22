import { Component, OnInit } from '@angular/core';
import { ChessBoard } from '../models/chess-board';
import { PAWN } from '../models/pawn';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chessBoardObj;
  pawn = new PAWN();
  report: string;
  firstMove = false;

  constructor() {
  }

  ngOnInit() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.chessBoardObj = ChessBoard.clearBoard;
  }

  getImageOnIndex(chessCol) {
    if (chessCol) {
      return chessCol.img;
    }
    return 'assets/default.png';
  }

  calcBoxColor(r, c) {
    return ((r + c) % 2 !== 1);
  }

  placePawn(x, y, f, c) {
    if( x >= 0 && x < 8 && y>= 0 && y < 8){
      if(this.pawn.colIndex > -1 && this.pawn.rowIndex > -1) {
        this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = null;
      }
      this.updatePawnObj(x, y, f, c);
      this.chessBoardObj[7-y][x] = this.pawn;
    }
  }

  updatePawnObj(x, y, f, c) {
    this.pawn.rowIndex = Number(x);
    this.pawn.colIndex = Number(y);
    this.pawn.direction = f;
    this.pawn.color = c;
    if(this.pawn.color == 'White') {
      this.pawn.img = 'assets/pawn-white.png';
    } else if(this.pawn.color =='Black') {
      this.pawn.img = 'assets/pawn-black.png';
    }
  }

  move(steps) {
    switch(this.firstMove) {
      case false: {
        this.moveForward(steps)
        break;
      }
      case true: {
        if (Number(steps) >1 ) {
          break;
        } else {
          this.moveForward(steps);
          break;
        }
      }
    }
  }

  moveForward(steps?) {
    steps = Number(steps);
    if(this.pawn.colIndex > -1 && this.pawn.rowIndex > -1) {
      switch(this.pawn.direction) {
        case 'North': {
          if((steps ==1 && this.pawn.colIndex < 7) || (steps == 2 && this.pawn.colIndex < 6)) {
            this.firstMove = true;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = null;
            this.pawn.colIndex = this.pawn.colIndex + steps;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = this.pawn;
          }
          break;
        }
        case 'East': {
          if((steps == 1 && this.pawn.rowIndex < 7) || (steps ==2 && this.pawn.rowIndex <6)) {
            this.firstMove = true;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = null;
            this.pawn.rowIndex = this.pawn.rowIndex + steps;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = this.pawn;
          }
          break;
        }
        case 'South': {
          if((steps == 1 && this.pawn.colIndex >0) || (steps == 2 && this.pawn.colIndex > 1)) {
            this.firstMove = true;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = null;
            this.pawn.colIndex = this.pawn.colIndex - steps;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = this.pawn;
          }
          break;
        }
        case 'West': {
          if((steps == 1 && this.pawn.rowIndex >0) || (steps == 2 && this.pawn.rowIndex > 1)) {
            this.firstMove = true;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = null;
            this.pawn.rowIndex = this.pawn.rowIndex - steps;
            this.chessBoardObj[7-this.pawn.colIndex][this.pawn.rowIndex] = this.pawn;
          }
          break;
        }
      }
    }
  }

  moveDirection(direction) {
    if(this.pawn.colIndex > -1 && this.pawn.rowIndex > -1) {
      switch(this.pawn.direction) {
        case 'North': {
          if(direction == 'left') {
            this.pawn.direction = 'West';
            break;
          } else {
            this.pawn.direction = 'East';
            break;
          }
        }
        case 'East': {
          if(direction == 'left') {
            this.pawn.direction = 'North';
            break;
          } else {
            this.pawn.direction = 'South';
            break;
          }
        }case 'South': {
          if(direction == 'left') {
            this.pawn.direction = 'East';
            break;
          } else {
            this.pawn.direction = 'West';
            break;
          }
        }case 'West': {
          if(direction == 'left') {
            this.pawn.direction = 'South';
            break;
          } else {
            this.pawn.direction = 'North';
            break;
          }
        }
      }
    }
  }

  reportData() {
    if(this.pawn.colIndex > -1 && this.pawn.rowIndex > -1) {
      this.report = this.pawn.rowIndex+', '+this.pawn.colIndex+', '+this.pawn.direction+', '+this.pawn.color;
    }
  }
}
