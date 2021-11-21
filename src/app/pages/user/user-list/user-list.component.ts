import { TableService } from './../../../components/table/table.service';
import { Schooling } from './../../../models/user/schooling.class';
import { User } from '../../../models/user/user.model';
import { UserListService } from './user-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDataTable } from 'src/app/components/table/dataTable.interface';
import { ITableOptions } from 'src/app/components/table/tableOptions.interface';
import { TableComponent } from 'src/app/components/table/table.component';
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public userList: User[];

  public options: ITableOptions;
  public dataTable: IDataTable;

  @ViewChild(TableComponent) tableComponent: TableComponent;
  public service: TableService;
  public table: TableComponent;

  private _unsubscribeAll: Subject<any>;

  constructor(private _userListService: UserListService) {
    this._unsubscribeAll = new Subject();

    const self = this;

    this.options = {
      onMatches: function (user: User, term: string,) {
        const data = moment(user.dataNascimento).format('DD/MM/YYYY');
        return user.nome?.toLowerCase().includes(term)
          || user.sobrenome?.toLowerCase().includes(term)
          || user.email?.toLowerCase().includes(term)
          || data?.toString().toLowerCase().includes(term)
          || self.getDataScooling(user.escolaridade)?.toLowerCase().includes(term);
      },
      pluralEntityName: 'Usuários',
      singularEntityName: 'usuário',
      button: {
        show: true,
        label: 'Novo usuário',
        route: '/user/add'
      }
    }
  }

  ngOnInit() {
    this._userListService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.userList = response;
      this.dataTable = { rows: this.userList };
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.service = this.tableComponent.service;
      this.table = this.tableComponent;
    }, 100);
  }

  getDataScooling(value: number) {
    return Schooling.enum[value];
  }

  getLinkEditUser(id: number) {
    return '/user/edit/' + id
  }
}

