import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragSelectTableComponent } from './drag-select-table.component';
import { DragSelectTdComponent } from './drag-select-td.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DragSelectTableComponent, DragSelectTdComponent],
  exports: [DragSelectTableComponent, DragSelectTdComponent]
})
export class DragSelectTableModule { }
