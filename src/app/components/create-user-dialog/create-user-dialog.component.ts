import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadStatus } from 'src/app/Models/LoadStatus';
import { User, UserRequest } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent {
  title: string;

  emailFormControl: FormControl;

  firstNameFormControl: FormControl;

  lastNameFormControl: FormControl;

  userForm: FormGroup;

  createUserStatus: LoadStatus = 'Not_Requested';

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data?: User
  ) {
    this.title = data ? 'Update User' : 'Create User';

    this.lastNameFormControl = new FormControl(data ? data.lastName : '', [
      Validators.required,
    ]);

    this.firstNameFormControl = new FormControl(data ? data.firstName : '', [
      Validators.required,
    ]);

    this.emailFormControl = new FormControl(data ? data.email : '', [
      Validators.required,
      Validators.email,
    ]);

    this.userForm = new FormGroup({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      email: this.emailFormControl,
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      if (this.data) {
        const user: User = {
          id: this.data.id,
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          email: this.emailFormControl.value,
        };

        this.userService.updateUser(user).subscribe(
          (data) => {
            this.createUserStatus = 'Success';
            this.dialogRef.close();
          },
          (error) => {
            this.createUserStatus = 'Failure';
          }
        );
      } else {
        const user: UserRequest = {
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          email: this.emailFormControl.value,
        };

        this.userService.createUser(user).subscribe(
          (data) => {
            this.createUserStatus = 'Success';
            this.dialogRef.close();
          },
          (error) => {
            this.createUserStatus = 'Failure';
          }
        );
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
