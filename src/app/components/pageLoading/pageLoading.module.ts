import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoadingComponent } from './pageLoading.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbProgressbarModule
  ],
  declarations: [PageLoadingComponent],
  exports: [PageLoadingComponent]
})
export class PageLoadingModule { }
