import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import { Category } from '../models/index';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html'
  // styleUrls: ['./categories.component.css']
})
export class EditCategoryComponent implements OnInit {

  category = new Category(1, '');

	@Output() onFormResult = new EventEmitter<any>();

  constructor(
    protected categoriesService: CategoriesService,
    private alertService: AlertService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  // To add a category
  editCategory() {
    this.categoriesService.addCategory(this.category).subscribe(
      res => {
        if(res.status == 200) {
          this.router.navigate(['categories']);
        }
        else {
          this.alertService.error('Failed to add category');
        }
      },
      err => {
        this.alertService.error(err._body);
      });
  }
}
