import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authservice: AuthService,
  ) { }

  async canActivate() {
    const result = await this.authservice.isAuthenticated();
    if (result) {
      console.log("user is authenticated");
      return true;
    }
    else {
      // User is logged out on page refresh currently
      this.authservice.logout();
      console.log("Access Denied");
      return false;
    }
  }

}
