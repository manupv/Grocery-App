import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemsService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {

  items: any;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
  	protected itemsService: ItemsService,
  	private alertService: AlertService
  ) { }

  ngOnInit() {
  	this.getItems(); // Fetch items
  }

  // To fetch all categories
  getItems() {
    this.itemsService.getItems().subscribe(
      res => {
        if(res.status == 200) {
        	this.items = res.json();
        }
      },
      err => {
      	this.alertService.error(err._body);
      });
  }

  // To open add/edit modal window
  presentAuthDialog(mode, selectedItem = null){
    this.modalDialog.openDialog(mode, selectedItem);
  }
}
