import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(
  	public http: Http
  ) { }

  // User login functionality
  userLogin(email, password) {
    let body = JSON.stringify({ email, password });

    return this.http.post('http://localhost:3000/auth/sign_in', body, { headers: contentHeaders })
    	.map((res: Response) => res);
  }

  // User signup functionality
  userSignup(signUpUser) {
    let email = signUpUser.email;
    let password = signUpUser.password;
    let password_confirmation = signUpUser.passwordConfirmation;
    let nickname = signUpUser.nickName;
    let name = signUpUser.name;
  	let body = JSON.stringify({ email, password, password_confirmation, nickname, name });

    return this.http.post('http://localhost:3000/auth', body, { headers: contentHeaders })
    	.map((res: Response) => res);
  }

  // User logout functionality
  userLogout() {
    let user = localStorage.getItem('currentUser');
    let userObj = JSON.parse(user);
    let accessToken = userObj.headers['access-token'][0];
    let client = userObj.headers['client'][0];
    let uid = userObj.headers['uid'][0];

  	const headers = new Headers();
  	headers.append('Accept', 'application/json');
  	headers.append('Content-Type', 'application/json');
  	headers.append('access-token', accessToken);
  	headers.append('client', client);
  	headers.append('uid', uid);

  	return this.http.delete('http://localhost:3000/auth/sign_out', { headers: headers })
  		.map((res: Response) => res);
  }

  // To find current user
  getUser(): Promise<any> {
    let user = localStorage.getItem('currentUser');
    let userData = {};

    if (user) {
      let userObj = JSON.parse(user);
      let userBody = JSON.parse(userObj._body);
      userData = userBody.data;
    }

    return Promise.resolve(userData);
  }

  // To check if the user is logged in or not
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }
}
