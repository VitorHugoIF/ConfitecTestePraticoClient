import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  private $state: Subscription = new Subscription();
  public isToggle = true;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.$state = this.layoutService.getState().subscribe(() => {
      this.isToggle = !this.isToggle;
    });
  }

  ngOnDestroy() {
    this.$state.unsubscribe();
  }
}
