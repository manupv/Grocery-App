import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { CategoriesComponent } from './categories.component';
import { Category } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input('selected-category') selectedCategory;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
    protected categoriesService: CategoriesService,
    private alertService: AlertService,
    public categoryComponent: CategoriesComponent
  ) { }

  ngOnInit() {
  }

  // To edit a category
  editCategory() {
    this.categoriesService.editCategory(this.selectedCategory).subscribe(
      res => {
        if(res.status == 200) {
          let index = this.categoryComponent.categories.indexOf(this.selectedCategory);
          this.selectedCategory = res.json();
          this.categoryComponent.categories.splice(index, 1, this.selectedCategory);
          this.modalDialog.closeDialog();
        }
        else {
          this.alertService.error('Failed to edit category');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
