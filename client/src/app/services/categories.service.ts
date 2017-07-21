import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CategoriesService {

  constructor(
  	public http: Http
  ) { }

  // To fetch categories
  getCategories() {
    return this.http.get('http://localhost:3000/categories', { headers: contentHeaders })
		.map((res: Response) => res);
  }
  // To add a category
  addCategory() {
    return this.http.post('http://localhost:3000/categories', { headers: contentHeaders })
		.map((res: Response) => res);
  }
}
