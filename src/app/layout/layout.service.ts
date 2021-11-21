import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  private state$ = new BehaviorSubject<any>(false);

  changeState(change: boolean) {
    this.state$.next(change);
  }

  getState() {
    return this.state$.asObservable();
  }
}
