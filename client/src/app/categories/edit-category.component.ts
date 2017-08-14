import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Category } from '../models/index';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input('selected-category') selectedCategory;
  @Output() onFormResult = new EventEmitter<any>();

  constructor(
    protected categoriesService: CategoriesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
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
