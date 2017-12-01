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
  styleUrls: ['./categories.component.css', '../app.component.css']
})
export class CategoriesComponent implements OnInit {

	categories: any;
  selectedCategory;
  @ViewChild('modalDialog') modalDialog: ModalDialogComponent;

  constructor(
  	protected categoriesService: CategoriesService,
  	private alertService: AlertService
  ) { }

  ngOnInit() {
  	this.getCategories(); // Fetch categories
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

  // To open add/edit modal window
  presentAuthDialog(mode, selectedCategory = null){
    this.modalDialog.openDialog(mode, selectedCategory);
  }

  // To delete a category
  deleteCategory(category) {
    this.categoriesService.deleteCategory(category).subscribe(
      res => {
        if(res.status == 204) {
          var index = this.categories.indexOf(category);
          this.categories.splice(index, 1);
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
