import { SortDirection } from "./table.directive";

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}
