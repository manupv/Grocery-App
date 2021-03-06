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
    return this.http.get('/apis/v1/categories', { headers: contentHeaders })
		.map((res: Response) => res);
  }

  // To add a category
  addCategory(category) {
    let body = JSON.stringify({ category: category });

    return this.http.post('/apis/v1/categories', body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To edit a category
  editCategory(category) {
    let body = JSON.stringify({ category: category });

    return this.http.put('/apis/v1/categories/' + category.id.toString(), body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To delete a category
  deleteCategory(category) {
    return this.http.delete('/apis/v1/categories/' + category.id.toString(), { headers: contentHeaders })
      .map((res: Response) => res);
  }
}
