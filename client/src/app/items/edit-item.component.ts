import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemsComponent } from './items.component';
import { ItemsService, CategoriesService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Item } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'edit-item',
  templateUrl: './edit-item.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditItemComponent implements OnInit {

  categories;
  @Input('selected-item') selectedItem;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected itemsService: ItemsService,
    public itemsComponent: ItemsComponent,
    private alertService: AlertService,
    public categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
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

  // To edit an item
  editItem() {
    this.itemsService.editItem(this.selectedItem).subscribe(
      res => {
        if(res.status == 200) {
          let index = this.itemsComponent.items.indexOf(this.selectedItem);
          this.selectedItem = res.json();
          this.itemsComponent.items.splice(index, 1, this.selectedItem);
          this.modalDialog.closeDialog();
        }
        else {
          this.alertService.error('Failed to edit item');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
