import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/data/constants';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showError: boolean = false;
  showPasswordError: boolean = false;
  showSuccess: boolean = false;
  minPasswordLen: number = Constants.passwordMinLength;

  constructor(private _builder: FormBuilder, private _router: Router, private _service: UserService) {
    this.registerForm = _builder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(this.minPasswordLen)]],
      reenterPassword: ["", [Validators.required]]
    });
  }

  register() {
    if (this.registerForm.get("password")?.value !== this.registerForm.get("reenterPassword")?.value) {
      this.showPasswordError = true;
      return;
    }

    let data = this.registerForm.value;
    this._service.register(data).subscribe(() => {
      this.showSuccess = true;
      this.registerForm.reset();
      this.showError = false;
      this.showPasswordError = false;
    }, () => {
      this.showError = true;
    });
  }

  ngOnInit(): void {
  }

}
