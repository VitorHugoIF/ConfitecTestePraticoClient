import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserListService implements Resolve<any> {
  onDataChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onDataChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getUsers()]).then(() => { resolve(); }, reject);
    });
  }

  private getUsers(): Promise<any> {
    return new Promise((resolve, reject) => [
      this._httpClient.get<any>(environment.base_url + environment.apiUser).subscribe((response: any) => {
        this.onDataChanged.next(response);
        resolve(response)
      }, reject)
    ]);
  }
}
