import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';

@NgModule({
  declarations: [AppComponent, CreateUserDialogComponent, DeleteUserDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
