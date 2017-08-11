import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { CategoriesComponent } from './categories.component';
import { Category } from '../models/index';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditCategoryComponent implements OnInit {

  selectedCategory = new Category(1, '');

  @Output() onFormResult = new EventEmitter<any>();
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;
  @Output() changeCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    protected categoriesService: CategoriesService,
    private alertService: AlertService,
    public router: Router,
    public categoryComponent: CategoriesComponent
  ) { }

  ngOnInit() {
    // this.selectedCategory = this.categoryComponent.selectedCategory;
    // this.changeCategory.emit(this.selectedCategory);
  }

  // To edit a category
  // editCategory() {
  //   this.categoriesService.editCategory(this.selectedCategory).subscribe(
  //     res => {
  //       if(res.status == 200) {
  //         this.selectedCategory = res.json();
  //       }
  //       else {
  //         this.alertService.error('Failed to edit category');
  //       }
  //     },
  //     err => {
  //       this.alertService.error(err._body);
  //     });
  // }
}
