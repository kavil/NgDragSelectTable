import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NzIconModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { BoxCascaderComponent } from './box-cascader.component';
import { NzTreeComponent, NzTreeNodeComponent } from './base-tree';
import { FormsModule } from '@angular/forms';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzIconModule
  ],
  declarations: [
    BoxCascaderComponent,
    NzTreeComponent,
    NzTreeNodeComponent
  ],
  exports: [
    BoxCascaderComponent,
    NzTreeComponent,
    NzTreeNodeComponent
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
  ]
})
export class BoxCascaderModule { }
