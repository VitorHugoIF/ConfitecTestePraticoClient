import { UserEditService } from './user-edit/user-edit.service';
import { UserListDirective } from './user-list/user-list.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListService } from './user-list/user-list.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'src/app/components/table/table.module';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: 'add',
    component: UserEditComponent,
    resolve: {
      UserEditService
    }
  },
  {
    path: 'edit/:id',
    component: UserEditComponent,
    resolve: {
      UserEditService
    }
  },
  {
    path: '',
    component: UserListComponent,
    resolve: {
      data: UserListService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    FormsModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserListComponent, UserEditComponent, UserListDirective],
  exports: [UserListComponent, UserEditComponent],
  providers: [UserListService, UserEditService]
})
export class UserModule { }
