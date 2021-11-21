import { TableDirective } from './../../../components/table/table.directive';
import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'th[sortable]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class UserListDirective extends TableDirective {

  constructor() {
    super();
  }
}
