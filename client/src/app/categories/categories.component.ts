import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { CategoriesService, AlertService } from '../services/index';
import 'rxjs/Rx';
import { MaterializeAction } from 'angular2-materialize';
import { TitleCasePipe } from '../pipes/title-case.pipe';
import { HumanizePipe } from '../pipes/humanize.pipe';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	categories: any;
  @Input('category-action-mode') categoryActionMode;
  modalActions = new EventEmitter<string|MaterializeAction>();

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

  // To open modal window
  openModal(mode){
    console.log(mode);
    this.categoryActionMode = mode;
    this.modalActions.emit({action:"modal", params:['open']});
  }

  // To open modal window
  openModalWindow(){
    console.log("zfasfsd")
    this.modalActions.emit({action:"modal", params:['open']});
  }

  isAddMode(){return this.categoryActionMode == 'addCategory'}
  isEditMode(){return this.categoryActionMode == 'editCategory'}
  // addCategory() {
  //   this.modalActions.emit({action:"modal", params:['open']});
  // }
}
