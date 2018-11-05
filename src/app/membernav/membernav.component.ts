import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

export interface Vendor {
  name: string;
}

@Component({
  selector: 'app-membernav',
  templateUrl: './membernav.component.html',
  styleUrls: ['./membernav.component.css']
})
export class MembernavComponent implements OnInit {

  rid: string;
  name = "";
  vendor: AngularFirestoreDocument<Vendor>;

  constructor(
    private db: AngularFirestore,
    private routerAct: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.vendor = this.db.collection('restaurants').doc(this.rid);
    this.vendor.valueChanges().subscribe(res => {
      this.name = res.name;
    })
  }

}
