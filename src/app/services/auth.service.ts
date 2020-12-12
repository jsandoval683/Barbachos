import { Injectable, Inject } from '@angular/core';
import { Signup } from '../models/signup.model';
import { Login } from '../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../models/userProfile.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url: string='https://localhost:44353/api/accounts';
  url2: string='https://localhost:44353/api/auth/login';
  url3: string='https://localhost:44353/api/facebook/authenticate';
  url4: string='https://localhost:44353/api/profile';

  // loggedIn: boolean = false;
  private loggedIn = false;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  userProfile: UserProfile;
  userProfile1: UserProfile;

  constructor(
    private router: Router,
    private _http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
      this.loggedIn = !!localStorage.getItem('auth_token');
    }

  signupUser(user: Signup) {
    console.log(user)
    console.log(this.url)
    return this._http.post(this.url, user, httpOption)
      .subscribe(data => this.router.navigate(['/login']))
  }

  loginUser(user: Login) {
    return this._http.post<Login>(this.url2, user)
      .subscribe(data => {
        this.setSession(data)
        this.loggedIn = true
        this.router.navigate(['/home'])
      })
  }


  facebookLogin(accessToken: string) {

    return this._http.post(
      // this.baseUrl + 'api/facebook/authenticate', JSON.stringify({ accessToken }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      this.url3, JSON.stringify({ accessToken }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .subscribe(data => {
        this.setSession(data)
        this.loggedIn = true
        this.router.navigate(['/home'])
      })
  }

  logout() {

    this.loggedIn = false
    localStorage.removeItem("id_token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login']);
  }

  guardarDato(data){
    this.userProfile = data
    this.userProfile1 = this.userProfile;
  }

  getUserProfile():Observable<any>{
    return this._http.get(this.url4, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}) });
    // if (this.userProfile == null) {
    //   return this._http.get(this.url4, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('auth_token')}) })
    //     .subscribe(data => {
    //       this.guardarDato(data);
    //     })
    // }
    // console.log(this.userProfile1)
    // return this.userProfile

  }

  // getUserProfile() {

  //   const authToken = localStorage.getItem("auth_token");

  //   if (this.userProfile == null) {
  //     this._http.get<UserProfile>(this.url4, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + authToken }) })
  //       .subscribe(data => {
  //         this.userProfile = data
  //       })
  //   }

  //   return this.userProfile

  // }

  isLoggedIn() {
    return this.loggedIn;
  }

  private setSession( authResult ) {
    const expiresAt = authResult.expiresIn * 1000 + Date.now();
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('auth_token', authResult.auth_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}
