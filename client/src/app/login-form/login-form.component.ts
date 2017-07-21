import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { AuthService, AlertService } from '../services/index';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

	signInUser = {
    email: '',
    password: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(
  	public router: Router,
		public http: Http,
		private authService: AuthService,
		private alertService: AlertService
	) { }

  ngOnInit() {
  }

  // Login functionality
  login(event, email, password) {
    event.preventDefault();
    // this.authService.userLogin(email, password);
    this.authService.userLogin(email, password).subscribe(
      res => {
        if(res.status == 200) {
        	// localStorage.setItem('currentUserAccessToken', res.headers.get('access-token'));
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.onFormResult.emit({signedIn: true, res});
          this.router.navigate(['profile']);
        }
      },
      err => {
      	this.onFormResult.emit({signedIn: false, err});
	      this.alertService.error(err._body);
      });
  }
}
