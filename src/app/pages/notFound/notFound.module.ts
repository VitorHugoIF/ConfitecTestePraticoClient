import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './notFound.component';

const routes: Routes = [
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }
