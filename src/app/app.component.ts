import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { LoadStatus } from './Models/LoadStatus';
import { User } from './Models/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[];
  loadStatus: LoadStatus;
  error: any;
  columnDefinition: string[];

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.users = [];
    this.columnDefinition = ['firstName', 'lastName', 'email', 'actions'];
    this.loadStatus = 'Requested';
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.loadStatus = 'Success';
      },
      (error) => {
        this.error = error;
        this.loadStatus = 'Failure';
      }
    );
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }

  openDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllUsers();
    });
  }
}
