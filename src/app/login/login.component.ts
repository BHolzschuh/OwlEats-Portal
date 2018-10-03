import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../services/firebase.service';

export interface User {
  first: string;
  last: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  items: Observable<any[]>
  user = {} as User;
  message;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder,
    private fbS: FirebaseService) {
    this.items = this.fbS.GetTable('/menuItems');
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        console.log('authenticated');
      }
    }
    catch (e) {
      console.error(e);
      this.checkErrors(e.code);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      this.message = "Invalid Email Address";
    }
    else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
      this.message = "Incorrect Email/Password";
    }
    else if (error == "auth/argument-error") {
      this.message = "Please fill out both fields";
    }
  }

}
