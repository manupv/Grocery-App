import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ListsComponent } from './lists.component';
import { ListsService, AlertService } from '../services/index';
import { List } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['../categories/categories.component.css']
})
export class AddListComponent implements OnInit {

  list = new List(null, '');
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected listsService: ListsService,
    private alertService: AlertService,
    public listsComponent: ListsComponent
  ) { }

  ngOnInit() {
  }

  // To add a list
  addList() {
    this.listsService.addList(this.list).subscribe(
      res => {
        if(res.status == 201) {
          this.listsComponent.lists.push(res.json());
          this.setDefaultList();
          this.modalDialog.closeDialog();
        }
        else {
          this.alertService.error('Failed to add list');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }

  // Set default list
  setDefaultList() {
    this.list = new List(null, '');
  }
}
