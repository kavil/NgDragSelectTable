import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DragSelectTableModule } from '../../projects/drag-select-table/src';
import { BoxCascaderModule } from '../../projects/box-cascader/src';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragSelectTableModule,
    BoxCascaderModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
