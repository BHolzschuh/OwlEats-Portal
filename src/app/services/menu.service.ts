import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(
    private authservice: AuthService,
    private db: AngularFirestore,
  ) { }

  getMenu(rid) {
    this.itemsCollection = this.db.collection('restaurants/' + rid + '/menu', ref => {
      return ref.orderBy('name');
    });
    return this.itemsCollection.valueChanges();
  }

}
