import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ListsComponent } from './lists.component';
import { ListsService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { List } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'edit-list',
  templateUrl: './edit-list.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditListComponent implements OnInit {

  @Input('selected-list') selectedList;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected listsService: ListsService,
    public listsComponent: ListsComponent,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // To edit a list
  editList() {
    this.listsService.editList(this.selectedList).subscribe(
      res => {
        if(res.status == 200) {
          let index = this.listsComponent.lists.indexOf(this.selectedList);
          this.selectedList = res.json();
          this.listsComponent.lists.splice(index, 1, this.selectedList);
          this.modalDialog.closeDialog();
        }
        else {
          this.alertService.error('Failed to edit list');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
