import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { AuthService, AlertService } from '../services/index';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {

	signUpUser = {
    email: '',
    nickName: '',
    name: '',
    password: '',
    passwordConfirmation: '',
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

  // Signup functionality
  signup(event, email, password, passwordConfirmation, nickName, name) {
    console.log("signUpUser-------------");
    console.log(this.signUpUser);
    event.preventDefault();
    // this.authService.userLogin(email, password);
    this.authService.userSignup(this.signUpUser).subscribe(
      res => {
        if (res.status == 200) {
        	this.onFormResult.emit({signedUp: true, res})
          this.router.navigate(['home']);
        }
      },
      err => {
      	this.onFormResult.emit({ signedUp: false, err })
	      this.alertService.error(err._body);
      });
  }
}
