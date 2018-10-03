import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  GetTable(table) {
    return this.db.list(table).valueChanges();
  }

  QueryTable(table, key, value) {
    return this.db.list(table, ref => ref.orderByChild(key).equalTo(value)).valueChanges();
  }

}