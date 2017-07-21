import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { AuthService, AlertService } from '../services/index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  @Output() onFormResult = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);
  }

  // To check if the user is logged in or not
  loggedIn() {
  	return this.authDialog.isLoggedIn();
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
