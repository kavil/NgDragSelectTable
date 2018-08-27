import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSelectTableComponent } from './drag-select-table.component';

describe('DragSelectTableComponent', () => {
  let component: DragSelectTableComponent;
  let fixture: ComponentFixture<DragSelectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragSelectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragSelectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
