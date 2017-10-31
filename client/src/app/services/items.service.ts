import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ItemsService {
  constructor(
  	public http: Http
  ) { }

  // To fetch items
  getItems() {
    return this.http.get('/apis/v1/items', { headers: contentHeaders })
		.map((res: Response) => res);
  }

  // To add an item
  addItem(item) {
    let body = JSON.stringify({ item: item });

    return this.http.post('/apis/v1/items', body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To edit an item
  editItem(item) {
    let body = JSON.stringify({ item: item });

    return this.http.put('/apis/v1/items/' + item.id.toString(), body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To delete an item
  deleteItem(item) {
    return this.http.delete('/apis/v1/items/' + item.id.toString(), { headers: contentHeaders })
      .map((res: Response) => res);
  }
}