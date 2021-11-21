import { TableService } from './table.service';
import { Observable } from 'rxjs';
import { IDataTable } from './dataTable.interface';
import { Component, Input, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ITableOptions } from './tableOptions.interface';
import { SortEvent, TableDirective } from './table.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() dataTable: IDataTable;
  @Input() tableOptions: ITableOptions;

  public hideme: boolean[] = [];
  public tables$: Observable<any[]>;
  public total$: Observable<number>;
  @ViewChildren(TableDirective) headers: QueryList<TableDirective>;
  public options: ITableOptions;

  constructor(public service: TableService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.options = {
      singularEntityName: 'Item',
      pluralEntityName: 'Itens',
      pageSizes: [10, 25, 50, 100],
      onMatches: undefined,
      button: {
        show: false,
        label: '',
        route: ''
      }
    };
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = { ...this.options, ...this.tableOptions };
    this.service.setTableData(this.dataTable.rows);
    if (this.options.onMatches) this.service.onMatch(this.options.onMatches);
  }

  onSort({ column, direction }: any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
