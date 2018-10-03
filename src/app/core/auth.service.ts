import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
   uid: string;
   email: string;
}

@Injectable({
   providedIn: 'root',
})
export class AuthService {

   user: Observable<any[]>;

   constructor(
      private afAuth: AngularFireAuth,
      private db: AngularFireDatabase,
      private router: Router,
   ) {
      this.user = this.afAuth.authState.pipe(switchMap(user => {
         if (user) {
            return this.db.list('').valueChanges();
         }
      }))

   }

}