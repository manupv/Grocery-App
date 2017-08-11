import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import { Category } from '../models/index';
import 'rxjs/Rx';
import { MaterializeAction } from 'angular2-materialize';
import { TitleCasePipe } from '../pipes/title-case.pipe';
import { HumanizePipe } from '../pipes/humanize.pipe';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	categories: any;
  selectedCategory = new Category(1, '');
	@Output() onFormResult = new EventEmitter<any>();
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;
  @Output() changeCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  	protected categoriesService: CategoriesService,
  	private alertService: AlertService
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

  presentAuthDialog(mode, selectedCategory){
    if (mode == 'editCategory') {
      if (selectedCategory) {
        this.selectedCategory = selectedCategory;
      }
      this.changeCategory.emit(selectedCategory);
    }
    this.modalDialog.openDialog(mode);
  }

  // To delete a category
  deleteCategory(category) {
    this.categoriesService.deleteCategory(category).subscribe(
      res => {
        if(res.status == 204) {
          this.categories.pop(category);
        }
        else {
          this.alertService.error('Failed to delete category');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
