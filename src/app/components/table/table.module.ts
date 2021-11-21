import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgbPaginationModule,
    FormsModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
  providers: []
})
export class TableModule { }
