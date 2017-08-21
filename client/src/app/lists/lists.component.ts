import { Component, OnInit, ViewChild } from '@angular/core';
import { ListsService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: any;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
  	protected listsService: ListsService,
  	private alertService: AlertService
  ) { }

  ngOnInit() {
  	this.getLists(); // Fetch lists
  }

  // To fetch all lists
  getLists() {
    this.listsService.getLists().subscribe(
      res => {
        if(res.status == 200) {
        	this.lists = res.json();
        }
      },
      err => {
      	this.alertService.error(err._body);
      });
  }

  // To delete a list
  deleteList(list) {
    this.listsService.deleteList(list).subscribe(
      res => {
        if(res.status == 204) {
          var index = this.lists.indexOf(list);
          this.lists.splice(index, 1);
        }
        else {
          this.alertService.error('Failed to delete list');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }

  // To open add/edit modal window
  presentAuthDialog(mode, selectedList = null){
    this.modalDialog.openDialog(mode, selectedList);
  }
}
