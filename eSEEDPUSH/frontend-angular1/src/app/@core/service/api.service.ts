import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
//import { JwtHelper } from 'angular2-jwt';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APIData , User  } from '../service/models/api.data.structure';

@Injectable()
export class APIService {
  // public static apiUrl = 'https://whatwhynot.net/api/';
  public static apiUrl = 'http://127.0.0.1:3000/api/';
  public static apiUrl_Intercept_Ignore_list: Array<String> = ['auth/login', 'auth/signup'];
  constructor( /*private jwtHelper: JwtHelper ,*/ private http: HttpClient) { }

  public static getToken(): string {
    return localStorage.getItem('token');
  }

  /*public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(APIService.getToken());
  }*/

  errorHandler(apiResponse: HttpErrorResponse) {
    return Observable.throw(apiResponse.error);
  }

 
}