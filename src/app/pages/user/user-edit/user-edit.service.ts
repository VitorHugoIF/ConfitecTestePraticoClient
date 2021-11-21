import { User } from './../../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEditService implements Resolve<any> {

  onDataChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onDataChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const idUser = Number(route.paramMap.get('id'));

    return new Promise<void>((resolve, reject) => {
      if (!idUser) {
        const empty = new User({});
        this.onDataChanged.next(empty);
        resolve();
      } else {
        Promise.all([this.getUser(idUser)]).then(() => { resolve(); }, reject);
      }
    });
  }

  private getUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => [
      this._httpClient.get<any>(environment.base_url + environment.apiUser + "/" + id).subscribe((response: any) => {
        this.onDataChanged.next(response);
        resolve(response)
      }, reject)
    ]);
  }

  save(id: number, user: User): Observable<User> {
    return user.id && id
      ? this._httpClient.put<User>(environment.base_url + environment.apiUser + "/" + id, user)
      : this._httpClient.post<User>(environment.base_url + environment.apiUser, user);
  }

  remove(id: number) {
    return this._httpClient.delete<User>(environment.base_url + environment.apiUser + "/" + id);
  }
}
