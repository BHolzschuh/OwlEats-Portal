import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  items: Observable<Item[]>;
  rid: string;

  constructor(
    private authservice: AuthService,
    private menuservice: MenuService,
    private routerAct: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.items = this.menuservice.getMenu(this.rid);
    this.items.subscribe(res => {
      console.log(res);
    });
  }

  logout() {
    this.authservice.logout();
  }

}
