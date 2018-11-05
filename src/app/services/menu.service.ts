import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
  iid: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  rid: string;
  itemsCollection: AngularFirestoreCollection<Item>;
  item: AngularFirestoreDocument<Item>;

  constructor(
    private db: AngularFirestore,
  ) { }

  getMenu(rid) {
    this.rid = rid;
    this.itemsCollection = this.db.collection('restaurants/' + rid + '/menu', ref => {
      return ref.orderBy('name');
    });
    return this.itemsCollection.valueChanges();
  }

  delete(item) {
    console.log("doc ID: " + item.iid);
    this.db.collection('restaurants/' + this.rid + '/menu').doc(item.iid).delete();
  }

  add(item) {
    console.log(this.rid);
    const id = this.db.createId();
    item.iid = id;
    this.db.collection('restaurants/' + this.rid + '/menu').doc(item.iid).set(item);
  }

}
