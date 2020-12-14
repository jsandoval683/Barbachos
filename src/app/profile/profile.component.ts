import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/userProfile.model';
// import { Injectable } from "@angular/core";
// import { Subject, BehaviorSubject } from "rxjs/Rx";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userProfile: UserProfile
  profileArray: any[]

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.getUserProfile();
    // this.profileArray = this._makeProfileArray(this.userProfile);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  guardarDato(data){
    this.userProfile = data
  }

  getUserProfile() {

    this.auth.getUserProfile().subscribe(data => {
      this.guardarDato(data);
    })
  }

  private _makeProfileArray(obj) {
    const keyPropArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + obj[key]);
      }
    }

    return keyPropArray;
  }
}