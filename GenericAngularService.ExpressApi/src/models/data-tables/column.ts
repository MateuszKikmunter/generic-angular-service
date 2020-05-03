import { Search } from './search';

export interface Column {
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: Search;
}