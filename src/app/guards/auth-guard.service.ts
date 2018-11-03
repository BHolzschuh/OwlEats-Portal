import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) { }

  async canActivate() {
    const result = await this.authservice.checkAuth();
    if (result) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      console.log("Access Denied");
      return false;
    }
  }

}
