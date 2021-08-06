import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/account/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuCollapsed: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private _router: Router, private _userService: UserService) {
    _userService.logInEvent.subscribe(() => {
      this.isLoggedIn = true;
    });

    this.isLoggedIn = _userService.isAuthenticated();
  }

  logout() {
    this._userService.logout();
    this.isLoggedIn = false;
    this._router.navigate(["login"]);
  }
}
