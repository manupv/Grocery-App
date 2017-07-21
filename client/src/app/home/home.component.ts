import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService} from '../services/index';

import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
	currentUser = {};

  constructor(
  	private authService: AuthService,
  	public http: Http
	) { }

  // To check if the user is logged in or not
  loggedIn() {
  	return this.authService.isLoggedIn();
  }

  ngOnInit() {
  	this.getUser();
  }

  // To find the user
  getUser(): void {
		this.authService.getUser().then(user => {
    	this.currentUser = user;
    });
  }
}
