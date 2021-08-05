import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(private _builder: FormBuilder, private _router: Router, private _service: UserService) {
    this.loginForm = this._builder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  login() {
    let data = this.loginForm.value;

    this._service.login(data).subscribe((result) => {
      localStorage.setItem("currentUser", JSON.stringify(result));
      this._router.navigate(["inventory"]);
    }, () => {
      this.showError = true;
    });
  }

  ngOnInit(): void {
  }

}
