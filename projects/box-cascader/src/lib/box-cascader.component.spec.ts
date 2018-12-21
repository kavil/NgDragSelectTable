import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCascaderComponent } from './box-cascader.component';

describe('BoxCascaderComponent', () => {
  let component: BoxCascaderComponent;
  let fixture: ComponentFixture<BoxCascaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCascaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCascaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
