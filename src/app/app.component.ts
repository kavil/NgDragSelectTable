import { Component, ViewEncapsulation } from '@angular/core';

const ROW_COUNT = 6;
const COL_COUNT = 7;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public resTable: any[]; // 主要用于获取数据

  public row = ROW_COUNT;
  public col = COL_COUNT;

  nodes = [{
    key: 'zhejiang',
    title: 'Zhejiang',
    children: [{
      key: 'hangzhou',
      title: 'Hangzhou',
      children: [{
        key: 'xihu',
        title: 'West Lake',
        isLeaf: true
      }]
    }, {
      key: 'ningbo',
      title: 'Ningbo',
      isLeaf: true
    }]
  }, {
    key: 'jiangsu',
    title: 'Jiangsu',
    children: [{
      key: 'nanjing',
      title: 'Nanjing',
      children: [{
        key: 'zhonghuamen',
        title: 'Zhong Hua Men',
        isLeaf: true
      }]
    }]
  }];

  public updateValues(values) {
    console.log(values); // values 跟 this.resTable 是一样的
  }

  // 用于格式化打印数值
  stringifyBoolMatrix() {
    if (!this.resTable) {
      return '';
    }
    const row2Str = row => {
      return row.map(cell => (cell ? ' true' : 'false')).join(', ');
    };
    return '[' + this.resTable.map(row2Str).join('],\n[') + ']\n';
  }


}
