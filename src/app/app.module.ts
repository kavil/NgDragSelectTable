import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragSelectTableModule } from 'projects/drag-select-table/src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragSelectTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
