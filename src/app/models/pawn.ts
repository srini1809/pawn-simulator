export class PAWN {
    rowIndex: number;
    colIndex: number;
    direction: string;
    color: string;
    img: string;

    constructor() {
        this.rowIndex = -1;
        this.colIndex = -1;
        this.direction = 'North';
        this.color = 'White';
        this.img = 'assets/pawn-white.png';
    }
}
