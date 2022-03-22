import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChessBoard } from '../models/chess-board';
import { PAWN } from '../models/pawn';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let componentSpy:  jasmine.SpyObj<HomePage>;

  const el = (selector) => fixture.nativeElement.querySelector(selector);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should have title', () => {
    expect(el('[data-test="title"]')).toBeTruthy();
  });

  it('should show chessBoard with 64 squares', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="chessBoardSquares"]').length).toBe(64);
  });

  it('should show place fields', () => {
    expect(el('[data-test="x"]')).toBeTruthy();
    expect(el('[data-test="y"]')).toBeTruthy();
    expect(el('[data-test="f"]')).toBeTruthy();
    expect(el('[data-test="c"]')).toBeTruthy();
  });

  it('should show place button', () => {
    expect(el('[data-test="place-btn"]')).toBeTruthy();
  });

  it('should show movex field', () => {
    expect(el('[data-test="movex"]')).toBeTruthy();
  });

  it('should show movex button', () => {
    expect(el('[data-test="movex-btn"]')).toBeTruthy();
  });

  it('should show move button', () => {
    expect(el('[data-test="move-btn"]')).toBeTruthy();
  });

  it('should show left button', () => {
    expect(el('[data-test="left-btn"]')).toBeTruthy();
  });

  it('should show right button', () => {
    expect(el('[data-test="right-btn"]')).toBeTruthy();
  });

  it('should show report button', () => {
    expect(el('[data-test="report-btn"]')).toBeTruthy();
  });

  it('should call placePawn method when place-btn clicked', () => {
    let placePawnSpy = spyOn(component, 'placePawn');
    const placeBtn = el('[data-test="place-btn"');

    placeBtn.click();

    expect(placePawnSpy).toHaveBeenCalled();
  });

  it('should initialize chessboardobj when component initialized', () => {
    component.ngOnInit();
    expect(component.chessBoardObj).toEqual(ChessBoard.clearBoard);
  });

  it('should update pawn object when valid values are entered and place button clicked', () => {
    const x = el('[data-test="x"] ion-input')
    x.value = 1;
    x.dispatchEvent(new Event('input'));

    const y = el('[data-test="y"] ion-input')
    y.value = 2;
    y.dispatchEvent(new Event('input'));

    const f = el('[data-test="f"] ion-input')
    f.value = 'East';
    f.dispatchEvent(new Event('input'));

    const c = el('[data-test="c"] ion-input')
    c.value = 'White';
    c.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="place-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 1;
    mockValue.colIndex = 2;
    mockValue.direction = 'East';
    mockValue.color = 'White';
    mockValue.img = 'assets/pawn-white.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should update chessboard location of pawn when valid values are entered', () => {
    const x = el('[data-test="x"] ion-input')
    x.value = 1;
    x.dispatchEvent(new Event('input'));

    const y = el('[data-test="y"] ion-input')
    y.value = 2;
    y.dispatchEvent(new Event('input'));

    const f = el('[data-test="f"] ion-input')
    f.value = 'East';
    f.dispatchEvent(new Event('input'));

    const c = el('[data-test="c"] ion-input')
    c.value = 'White';
    c.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="place-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 1;
    mockValue.colIndex = 2;
    mockValue.direction = 'East';
    mockValue.color = 'White';
    mockValue.img = 'assets/pawn-white.png'

    expect(component.chessBoardObj[7-y.value][x.value]).toEqual(mockValue);

  });

  it('should not update pawn object when invalid values are entered', () => {
    const x = el('[data-test="x"] ion-input')
    x.value = 9;
    x.dispatchEvent(new Event('input'));

    const y = el('[data-test="y"] ion-input')
    y.value = 2;
    y.dispatchEvent(new Event('input'));

    const f = el('[data-test="f"] ion-input')
    f.value = 'East';
    f.dispatchEvent(new Event('input'));

    const c = el('[data-test="c"] ion-input')
    c.value = 'White';
    c.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="place-btn"]').click();

    const spyUpdatePawnObj = spyOn(component, 'updatePawnObj');
    expect(spyUpdatePawnObj).not.toHaveBeenCalled();
  });

  it('should remove pawn from old position if pawn is on board and new valid values are entered', () => {

    component.placePawn(1, 2, 'East', 'White');

    let previousRowIndex = component.pawn.rowIndex;
    let previousColIndex = component.pawn.colIndex;

    const x = el('[data-test="x"] ion-input')
    x.value = 3;
    x.dispatchEvent(new Event('input'));

    const y = el('[data-test="y"] ion-input')
    y.value = 5;
    y.dispatchEvent(new Event('input'));

    const f = el('[data-test="f"] ion-input')
    f.value = 'North';
    f.dispatchEvent(new Event('input'));

    const c = el('[data-test="c"] ion-input')
    c.value = 'White';
    c.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="place-btn"]').click();

    expect(component.chessBoardObj[7-previousColIndex][previousRowIndex]).toEqual(null);
  });

  it('should move pawn 2 steps if its the first movie', () => {

    component.placePawn(1, 2, 'East', 'White');

    const movex = el('[data-test="movex"] ion-input')
    movex.value = 2;
    movex.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="movex-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 3;
    mockValue.colIndex = 2;
    mockValue.direction = 'East';
    mockValue.color = 'White';
    mockValue.img = 'assets/pawn-white.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should not move pawn 2 steps if its not the first movie', () => {

    component.placePawn(1, 2, 'East', 'White');

    const movex = el('[data-test="movex"] ion-input')
    movex.value = 2;
    movex.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="movex-btn"]').click();

    movex.value = 2;
    movex.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    el('[data-test="movex-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 3;
    mockValue.colIndex = 2;
    mockValue.direction = 'East';
    mockValue.color = 'White';
    mockValue.img = 'assets/pawn-white.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should move pawn 1 step when value 1 is entered in movex input', () => {

    component.placePawn(3, 2, 'East', 'White');

    const movex = el('[data-test="movex"] ion-input')
    movex.value = 1;
    movex.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    el('[data-test="movex-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 4;
    mockValue.colIndex = 2;
    mockValue.direction = 'East';
    mockValue.color = 'White';
    mockValue.img = 'assets/pawn-white.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should move forward 1 step towards the direction facing - North facing', () => {

    component.placePawn(4, 5, 'North', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 4;
    mockValue.colIndex = 6;
    mockValue.direction = 'North';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should not move forward if its the end of the board - North facing', () => {

    component.placePawn(6, 7, 'North', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 6;
    mockValue.colIndex = 7;
    mockValue.direction = 'North';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should move forward 1 step towards the direction facing - East facing', () => {

    component.placePawn(2, 3, 'East', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 3;
    mockValue.colIndex = 3;
    mockValue.direction = 'East';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should not move forward if its the end of the board - East facing', () => {

    component.placePawn(7, 5, 'East', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 7;
    mockValue.colIndex = 5;
    mockValue.direction = 'East';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should move forward 1 step towards the direction facing - South facing', () => {

    component.placePawn(4, 2, 'South', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 4;
    mockValue.colIndex = 1;
    mockValue.direction = 'South';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should not move forward if its the end of the board - South facing', () => {

    component.placePawn(3, 0, 'South', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 3;
    mockValue.colIndex = 0;
    mockValue.direction = 'South';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should move forward 1 step towards the direction facing - West facing', () => {

    component.placePawn(2, 5, 'West', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 1;
    mockValue.colIndex = 5;
    mockValue.direction = 'West';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should not move forward if its the end of the board - West facing', () => {

    component.placePawn(0, 4, 'West', 'Black');

    fixture.detectChanges();
    el('[data-test="move-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 0;
    mockValue.colIndex = 4;
    mockValue.direction = 'West';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to left - North facing', () => {

    component.placePawn(2, 4, 'North', 'Black');

    fixture.detectChanges();
    el('[data-test="left-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'West';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to left - East facing', () => {

    component.placePawn(2, 4, 'East', 'Black');

    fixture.detectChanges();
    el('[data-test="left-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'North';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to left - South facing', () => {

    component.placePawn(2, 4, 'South', 'Black');

    fixture.detectChanges();
    el('[data-test="left-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'East';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to left - West facing', () => {

    component.placePawn(2, 4, 'West', 'Black');

    fixture.detectChanges();
    el('[data-test="left-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'South';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to right - North facing', () => {

    component.placePawn(2, 4, 'North', 'Black');

    fixture.detectChanges();
    el('[data-test="right-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'East';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to right - East facing', () => {

    component.placePawn(2, 4, 'East', 'Black');

    fixture.detectChanges();
    el('[data-test="right-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'South';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to right - South facing', () => {

    component.placePawn(2, 4, 'South', 'Black');

    fixture.detectChanges();
    el('[data-test="right-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'West';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should change direction 90deg to right - West facing', () => {

    component.placePawn(2, 4, 'West', 'Black');

    fixture.detectChanges();
    el('[data-test="right-btn"]').click();

    let mockValue = new PAWN();
    mockValue.rowIndex = 2;
    mockValue.colIndex = 4;
    mockValue.direction = 'North';
    mockValue.color = 'Black';
    mockValue.img = 'assets/pawn-black.png'

    expect(component.pawn).toEqual(mockValue);

  });

  it('should show pawn obj on report button clicked', () => {

    component.placePawn(2, 6, 'South', 'Black');

    el('[data-test="report-btn"]').click();
    fixture.detectChanges();
   
    expect(el('[data-test="report"]').textContent).toBe(' Output: 2, 6, South, Black')
  });

});
