import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

//
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

//
import { AdminModule } from './admin/admin.module';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginFacebookComponent } from './login-facebook/login-facebook.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    LoginFacebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    AdminModule,
    MatToolbarModule
  ],
  providers: [
    // provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    // provide: 'BASE_URL'
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}