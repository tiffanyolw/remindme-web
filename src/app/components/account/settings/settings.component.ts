import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/data/constants';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/account/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  updateUserForm: FormGroup;
  minPasswordLen: number = Constants.passwordMinLength;

  constructor(private _builder: FormBuilder, private _userService: UserService) {
    this.user = this._userService.getCurrentUser();

    this.updateUserForm = this._builder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(this.minPasswordLen)]],
      confirmNewPassword: ["", [Validators.required]]
    });
  }

  private update(body: User) {
    this._userService.updateUser(body).subscribe((result) => {
      localStorage.setItem("currentUser", JSON.stringify(result));
    }, () => {
      // error
    });
  }

  onUpdateFirstName() {
    let body = this.user;
    body.firstName = this.firstNameCtrl?.value;

    this.update(body);
  }

  onUpdateLastName() {
    let body = this.user;
    body.lastName = this.lastNameCtrl?.value;

    this.update(body);
  }

  onUpdateEmail() {
    let body = this.user;
    body.email = this.emailCtrl?.value;

    this.update(body);
  }

  onUpdatePassword() {
    let body: any = {};
    body.newPassword = this.newPasswordCtrl?.value;
    body.currentPassword = this.currentPasswordCtrl?.value;

    if (this.currentPasswordCtrl?.value !== this.confirmNewPasswordCtrl?.value) {
      // error
      return;
    }

    this._userService.updateUserPassword(body).subscribe((result) => {
      localStorage.setItem("currentUser", JSON.stringify(result));

      // only reset the password fields
      this.updateUserForm.reset({
        firstName: this.firstNameCtrl?.value,
        lastName: this.lastNameCtrl?.value,
        email: this.emailCtrl?.value
      });
    }, () => {
      // error
    });
  }

  get firstNameCtrl() {
    return this.updateUserForm.get("firstName");
  }

  get lastNameCtrl() {
    return this.updateUserForm.get("lastName");
  }

  get emailCtrl() {
    return this.updateUserForm.get("email");
  }

  get currentPasswordCtrl() {
    return this.updateUserForm.get("currentPassword");
  }

  get newPasswordCtrl() {
    return this.updateUserForm.get("newPassword");
  }

  get confirmNewPasswordCtrl() {
    return this.updateUserForm.get("confirmNewPassword");
  }

  ngOnInit(): void {
  }

}
