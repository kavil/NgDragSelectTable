import {
  Component, Input, Output,
  EventEmitter, ViewEncapsulation,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ds-table',
  templateUrl: './drag-select-table.component.html',
  styleUrls: ['./drag-select-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DragSelectTableComponent implements OnInit {
  @Input() row = 5;
  @Input() column = 5;
  @Input() class: string;
  @Output() valuesChange = new EventEmitter();
  public showStyle: object;

  private before: any = null;
  private after: any = { x: 0, y: 0 };
  private beforeStatus: any = undefined;
  private reverse: any = { x: false, y: false };

  private _values: boolean[][] = [];
  @Input() set values(val: any) {
    if (!val || val.length <= 0) {
      for (let i = 0; i < this.row; i++) {
        this._values[i] = [];
      }
    } else {
      this._values = val;
    }
  }
  get values() {
    return this._values;
  }

  get rowList() {
    const _rowList = [];
    for (let i = 0; i < this.row; i++) {
      _rowList.push(i);
    }
    return _rowList;
  }

  get columnList() {
    const _columnList = [];
    for (let i = 0; i < this.column; i++) {
      _columnList.push(i);
    }
    return _columnList;
  }

  ngOnInit() {
    this.initValues();
  }

  getWrapperClass() {
    return {
      [`${this.class}`]: this.class,
      ['drag-select-table']: true,
    };
  }

  setActive(x, y) {
    if (!this.before || !this.after) {
      return false;
    }
    if (this.reverseCondition(this.before, this.after, x, y)) {
      return true;
    }
  }

  setValue(before, after, status) {
    for (let i = 0; i < this.row; i++) {
      if (!this._values[i]) {
        this._values[i] = [];
      }
      for (let j = 0; j < this.column; j++) {
        if (this.reverseCondition(before, after, i, j)) {
          this._values[i][j] = !status;
        }
      }
    }
    this.valuesChange.emit(this._values);
    console.log('values-->', this._values);
  }

  reverseCondition(before, after, x, y) {
    let condition = true;
    if (this.reverse.x) {
      condition = condition && (x >= after.x && x <= before.x);
    } else {
      condition = condition && (x >= before.x && x <= after.x);
    }
    if (this.reverse.y) {
      condition = condition && (y >= after.y && y <= before.y);
    } else {
      condition = condition && (y >= before.y && y <= after.y);
    }
    return condition;
  }

  mouseStart(event) {
    this.beforeStatus = event.checked;
    this.before = { x: event.x, y: event.y };
  }
  mouseIng(event) {
    if (!this.before) { return; }
    this.reverse = { x: event.x < this.before.x, y: event.y < this.before.y };
    this.after = { x: event.x, y: event.y };
  }
  mouseEnd(event) {
    if (!this.before) { return; }
    this.after = { x: event.x, y: event.y };
    this.setValue(this.before, this.after, this.beforeStatus);
    this.after = null;
    this.before = null;
    this.beforeStatus = undefined;
  }

  private initValues() {
    if (!this._values || this._values.length <= 0 || this._values[0].length <= 0) {
      for (let i = 0; i < this.row; i++) {
        this._values[i] = [];
        for (let j = 0; j < this.column; j++) {
          this._values[i].push(false);
        }
      }
      setTimeout(() => {
        this.valuesChange.emit(this._values);
      });
    }
  }
}
