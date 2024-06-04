import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string ;
  password: string ;
 constructor(private authservie:AuthService){}
  onSubmit(loginform) {
    // if (this.email && this.password) {
    //   console.log('Email:', this.email);
    //   console.log('Password:', this.password);
    
    // }

    this.authservie.login(loginform.email,loginform.password)
  }
 
}
