import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import 'rxjs/Rx';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	categories: any;

	@Output() onFormResult = new EventEmitter<any>();

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
}
