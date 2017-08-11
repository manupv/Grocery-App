import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.sass']
})
export class ModalDialogComponent implements OnInit {

	@Input('modal-mode') modalMode;//: 'login' | 'register' = 'login';
	modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  openDialog(mode) {
    this.modalMode = mode;
    this.modalActions.emit({action:"modal", params:['open']});
  }

  closeDialog(){
    this.modalActions.emit({action:"modal", params:['close']});
  }

  ngOnInit() {
  }

  isAddMode(){ return this.modalMode == 'addCategory' }
  isEditMode(){ return this.modalMode == 'editCategory' }

}
