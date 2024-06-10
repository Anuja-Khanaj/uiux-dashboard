import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string ;
  password: string ;
  confirmPassword:string
 constructor(private authservie:AuthService){}
  onSubmit(loginform) {
    if ( this.password != this.confirmPassword) {
      
          this.authservie.SignUp(loginform.email,loginform.password)
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    
    }
    else{
      alert("password doesnt match")
    }
  }
}
