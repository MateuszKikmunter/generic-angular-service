import { Order } from './order';
import { Search } from './search';
import { Column } from './column';

export class DataTablesOptions {
    draw: number;
    start: number;
    length: number;
    columns: Column[];
    search: Search;
    order: Order[];
}