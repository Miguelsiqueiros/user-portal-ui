import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequest } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly ROOT_URL =
    'https://user-portal-management-api.herokuapp.com/api/users';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.ROOT_URL}/all`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.ROOT_URL}`, {
      params: new HttpParams().set('id', id),
    });
  }

  createUser(user: UserRequest): Observable<number> {
    return this.httpClient.post<number>(`${this.ROOT_URL}`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${this.ROOT_URL}`, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.ROOT_URL}/byId/${id}`);
  }
}
