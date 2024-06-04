import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userEmail:string;
  isLoggedIn$:Observable<boolean>
  constructor(private authservie:AuthService
  ){}
    ngOnInit(){
    this.userEmail = JSON.parse(localStorage.getItem('user')).email;
    console.log(this.userEmail);
    this.isLoggedIn$ = this.authservie.isLoggedIn();
    
    }
    onLogout(){
      this.authservie.logOut();

    }
}
