import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadStatus } from 'src/app/Models/LoadStatus';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent {
  deleteStatus: LoadStatus;

  userName: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.deleteStatus = 'Not_Requested';

    this.userName = `${data.firstName} ${data.lastName}`;
  }

  deleteUser(): void {
    this.userService.deleteUser(this.data.id).subscribe(
      (data) => {
        this.deleteStatus = 'Success';
        this.dialogRef.close();
      },
      (error) => {
        this.deleteStatus = 'Failure';
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
