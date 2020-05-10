export interface DataTablesResponse<T> {
    data: T[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}