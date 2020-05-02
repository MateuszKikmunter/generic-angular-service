import { Search } from './search';

export class Column {
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: Search;
}