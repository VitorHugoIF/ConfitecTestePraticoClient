export interface ITableOptions {
  pluralEntityName?: string;
  singularEntityName?: string;
  pageSizes?: number[];
  onMatches?: Function;
  button?: {
    show?: boolean,
    label?: string;
    route?: string;
  }
}
