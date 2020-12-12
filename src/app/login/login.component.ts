import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { 
    // if(this.auth.userProfile){
    //   this.router.navigate(['/'])
    // }
  }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    var user: Login = new Login();
    user.userName = target.querySelector('#email').value
    user.password = target.querySelector('#password').value
    this.auth.loginUser(user)
  }


}
