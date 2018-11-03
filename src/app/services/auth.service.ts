import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface Vendor {
  vid: string;
  rid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  vendorsCollection: AngularFirestoreCollection<Vendor>;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
  ) {
    this.checkAuth();
  }

  async login(value) {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
      if (user) {
        this.getVendors().subscribe(res => {
          let info = res.find(x => x.vid === user.user.uid);
          if (info) {
            console.log("Found a vendor");
            this.authenticationState.next(true);
            this.router.navigate(['welcome/' + info.rid]);
          }
        });
      }
    }
    catch (e) {
      return this.checkErrors(e.code);
    }
  }

  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      return "Invalid Email Address";
    }
    else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
      return "Incorrect Email/Password";
    }
    else if (error == "auth/argument-error") {
      return "Please fill out both fields";
    }
    else if (error == "auth/email-already-in-use") {
      return "That email is already in use";
    }
  }

  async checkAuth() {
    const result = await this.afAuth.authState;
    if (result) {
      this.authenticationState.next(true);
      return true;
    }
    else {
      this.authenticationState.next(false);
      return false;
    }
  }

  getVendors() {
    this.vendorsCollection = this.afStore.collection('restaurants');
    return this.vendorsCollection.valueChanges();
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getVID() {
    return this.afAuth.auth.currentUser.uid;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authenticationState.next(false);
    this.router.navigate(['login']);
  }

}
