import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../services/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	currentUser = {};

	@Output() onFormResult = new EventEmitter<any>();

  constructor(
		protected authService:AuthService,
		private alertService: AlertService,
		private router:Router
	) { }

  ngOnInit() {
  	this.getUser();
  }

  // To find the user
  getUser(): void {
    this.authService.getUser().then(user => {
    	this.currentUser = user;
    });
  }

  // Logout functionality
  logout() {
    // remove user from local storage to log user out
    this.authService.userLogout().subscribe(
      res => {
        if(res.status == 200) {
          this.onFormResult.emit({signedIn: false, res});
          localStorage.removeItem('currentUser');
          this.router.navigate(['']);
        }
      },
      err => {
        this.onFormResult.emit({signedIn: true, err});
        this.alertService.error(err._body);
      });
	}

}
