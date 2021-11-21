import { PageLoadingModule } from './../components/pageLoading/pageLoading.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PageLoadingModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
