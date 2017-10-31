import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ListsService {
  constructor(
  	public http: Http
  ) { }

  // To fetch lists
  getLists() {
    return this.http.get('/apis/v1/lists', { headers: contentHeaders })
		.map((res: Response) => res);
  }

  // To add a list
  addList(list) {
    let body = JSON.stringify({ list: list });

    return this.http.post('/apis/v1/lists', body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To edit an list
  editList(list) {
    let body = JSON.stringify({ list: list });

    return this.http.put('/apis/v1/lists/' + list.id.toString(), body, { headers: contentHeaders })
      .map((res: Response) => res);
  }

  // To delete a list
  deleteList(list) {
    return this.http.delete('/apis/v1/lists/' + list.id.toString(), { headers: contentHeaders })
      .map((res: Response) => res);
  }
}