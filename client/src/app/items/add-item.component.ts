import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ItemsComponent } from './items.component';
import { ItemsService, AlertService } from '../services/index';
import { Item } from '../models/index';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./items.component.sass']
})
export class AddItemComponent implements OnInit {

  item = new Item(1, '', '', 1);

  @Output() onFormResult = new EventEmitter<any>();
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected itemsService: ItemsService,
    private alertService: AlertService,
    public router: Router,
    public itemsComponent: ItemsComponent
  ) { }

  ngOnInit() {
  }

  // To add an item
  addItem() {
    this.itemsService.addItem(this.item).subscribe(
      res => {
        console.log(res)
        if(res.status == 200) {
          this.itemsComponent.items.push(res.json());
          this.modalDialog.closeDialog();
        }
        else {
          this.alertService.error('Failed to add item');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
