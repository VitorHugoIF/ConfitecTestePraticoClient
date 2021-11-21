import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-pageLoading',
  templateUrl: './pageLoading.component.html',
  styleUrls: ['./pageLoading.component.scss']
})
export class PageLoadingComponent implements OnInit {

  loading = false;
  color = 'primary';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          this.color = 'primary';
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          this.color = 'danger';
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {
  }
}
