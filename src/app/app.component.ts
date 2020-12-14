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
    this.getUserProfile();
  }

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

