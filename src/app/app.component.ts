import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserProfile } from './models/userProfile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  userProfile: UserProfile
  profileArray: any[]
  name : string ="";

  public isLogged: boolean = false;

  constructor(private auth: AuthService) { }

  title = 'Barbachos';

  ngOnInit() {
    // this.onCheckUser();
    this.getUserProfile();
  }

  // onCheckUser () :void{

  //   if (this.auth.getUserProfile() == null){
  //     this.isLogged = false;
  //   } else {
  //     this.isLogged = true;
  //     // console.log(this.auth.userProfile.name);
  //     // this.name = this.auth.userProfile.name;
  //   }

  // }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  
  guardarDato(data){
    this.userProfile = data
    this.name = this.userProfile.name;
  }

  getUserProfile() {

    this.auth.getUserProfile().subscribe(data => {
      this.guardarDato(data);
    })
  }

  logout() {
    this.auth.logout();
  }

}

