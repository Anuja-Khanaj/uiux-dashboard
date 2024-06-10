import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isloggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) {
    this.checkLoginStatus();
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.loggedIn.next(true);
      this.isloggedInGuard = true;
      localStorage.setItem('loggedIn', 'true'); // Store login state
      this.router.navigate(['dashboard']);
      this.toastr.success('Logged In Successfully');
      this.loadUser();
    }).catch(e => {
      this.toastr.warning(e.message);
    });
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success("User logged out successfully");
      this.loggedIn.next(false);
      this.isloggedInGuard = false;
      localStorage.removeItem('loggedIn'); // Remove login state
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      this.loggedIn.next(true);
      this.isloggedInGuard = true;
    } else {
      this.loggedIn.next(false);
      this.isloggedInGuard = false;
    }
  }
}
