import { Component, forwardRef, Input, Output, EventEmitter, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

import { NzTreeComponent } from './base-tree';
import { merge, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BoxCascaderComponent),
  multi: true
};

const selectTagAnimation: AnimationTriggerMetadata = trigger('selectTagAnimation', [
  state('*', style({ opacity: 1, transform: 'scale(1)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate('150ms linear')
  ]),
  state('void', style({ opacity: 0, transform: 'scale(0)' })),
  transition('* => void', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('150ms linear')
  ])
]);

@Component({
  selector: 'box-cascader',
  animations: [selectTagAnimation],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: './box-cascader.component.html',
  styleUrls: ['./box-cascader.component.scss'],
})
export class BoxCascaderComponent implements OnInit, OnDestroy, ControlValueAccessor {


  @ViewChild('treeRef') treeRef: NzTreeComponent;
  @Input() disabled = false;
  @Input() value: any = [];
  @Input() nodes = [];
  @Output() change = new EventEmitter<boolean>();
  @Output() nzTreeClick = new EventEmitter<any>();
  @Output() checkBoxChange = new EventEmitter<any>();
  @Output() nzRemoved = new EventEmitter<any>();
  @Output() nzInited = new EventEmitter<any>();
  @Input() selected;
  selectedNodes: any[] = [];
  selectionChangeSubscription: Subscription;

  constructor() { }

  async ngOnInit() {
    this.selectionChangeSubscription = this.subscribeSelectionChange();
  }
  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
  }

  subscribeSelectionChange(): Subscription {
    return merge(
      this.nzTreeClick.pipe(
        tap((event) => {
          const node = event.node;
          node.isSelected = false;
        }),
        filter((event) => {
          return !event.node.isDisabled && !event.node.isDisableCheckbox;
        })
      ),
      this.checkBoxChange,
      this.nzRemoved,
      this.nzInited,
    ).subscribe(() => {
      this.updateSelectedNodes();
      const value = this.selectedNodes.map(node => node.key);
      this.value = [...value];
      this.onChangeCallback(this.value);
      this.change.emit(this.value);
    });
  }

  updateSelectedNodes(): void {
    if (this.treeRef) {
      this.selectedNodes = [...this.treeRef.getCheckedNodeList()];
      if (this.selected) {
        this.selected.nodes = this.selectedNodes;
      }
    }
  }

  onClearSelection(): void {
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
    this.nzRemoved.emit(null);
  }

  removeSelected(node: any, emit: boolean = true, event?: MouseEvent): void {
    node.isSelected = false;
    node.isChecked = false;
    this.treeRef.nzTreeService.conduct(node);
    this.treeRef.nzTreeService.setCheckedNodeList(node);
    if (emit) {
      this.nzRemoved.emit(node);
    }
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  public writeValue(value: any): void {
    if (value) {
      this.value = value;
      setTimeout(() => {
        this.updateSelectedNodes();
        this.nzInited.emit();
      });
    } else {
      this.value = [];
      this.selectedNodes.forEach(node => {
        this.removeSelected(node, false);
      });
      this.selectedNodes = [];
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  private onTouchedCallback = () => {
    // placeholder
  }
  private onChangeCallback = (_: any) => {
    // placeholder
  }
}
