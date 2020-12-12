import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/userProfile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userProfile: UserProfile
  userProfile1: UserProfile
  profileArray: any[]
  name : string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
    
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  guardarDato(data){
    this.userProfile = data
    this.name = this.userProfile.name;
  }


  getUserProfile(){
    this.auth.getUserProfile().subscribe(data => {
      this.guardarDato(data);
    })
  }

  logout() {
    this.auth.logout();
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
