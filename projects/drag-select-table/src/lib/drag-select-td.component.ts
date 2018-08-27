import {
  Component, Input, Output,
  EventEmitter, HostBinding, HostListener
} from '@angular/core';

@Component({
  selector: 'td[cell]',
  template: '',
})
export class DragSelectTdComponent {
  @Output() mouseStart = new EventEmitter();
  @Output() mouseIng = new EventEmitter();
  @Output() mouseEnd = new EventEmitter();
  @Input() coordinate: any = { x: 0, y: 0 };
  @Input() checked = false;
  @Input() active = false;

  @HostBinding('class.active')
  get activeClass(): boolean {
    return this.active;
  }
  @HostBinding('class.checked')
  get checkedClass(): boolean {
    return this.checked;
  }

  @HostListener('mousedown') mousedownFun() {
    this.mouseStart.emit(Object.assign(this.coordinate, { checked: this.checked }));
  }

  @HostListener('mousemove') mousemoveFun() {
    this.mouseIng.emit(Object.assign(this.coordinate, { checked: this.checked }));
  }

  @HostListener('mouseup') mouseupFun() {
    this.mouseEnd.emit(Object.assign(this.coordinate, { checked: this.checked }));
  }
}
