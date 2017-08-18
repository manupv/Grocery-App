import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ItemsComponent } from './items.component';
import { ItemsService, AlertService, CategoriesService } from '../services/index';
import { Item } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./items.component.css']
})
export class AddItemComponent implements OnInit {

  item = new Item(null, '', '', null);
  categories: any;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected itemsService: ItemsService,
    private alertService: AlertService,
    public itemsComponent: ItemsComponent,
    public categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  // To add an item
  addItem() {
    this.itemsService.addItem(this.item).subscribe(
      res => {
        if(res.status == 201) {
          this.itemsComponent.items.push(res.json());
          this.setDefaultItem();
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

  // To fetch all categories
  getCategories() {
    this.categoriesService.getCategories().subscribe(
      res => {
        if(res.status == 200) {
          this.categories = res.json();
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }

  // Set default item
  setDefaultItem() {
    this.item = new Item(null, '', '', null);
  }
}
