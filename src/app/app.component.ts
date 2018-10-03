import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Observable<any[]>;

  constructor(private fbS: FirebaseService) {
    this.users = this.fbS.QueryTable('userInfo', 'first', 'brian');
  }
}
