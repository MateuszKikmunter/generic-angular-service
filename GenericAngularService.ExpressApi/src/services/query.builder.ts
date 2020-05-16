export class QueryBuilder {    

    private _query: string;

    constructor() {
        this._query = "";
    }

    public select(...params: string[]): QueryBuilder {
        const parameters: string = params.length > 1 
            ? params.join(",") 
            : params[0];

        this._query = `SELECT ${parameters}\n`;
        return this;
    }

    public from(from: string): QueryBuilder {
        this._query = `${this._query} FROM ${from}\n`;
        return this;
    }

    public where(column: string, term: string, equals?: boolean): QueryBuilder {
        this._query = `${this._query} WHERE ${column} ${equals ? '= ' + term : ` LIKE '%${term}%'`}\n`;
        return this;
    }

    public leftJoin(tableToJoin: string, sourceColumn: string, columnToJoin: string): QueryBuilder {
        this._query = `${this._query} LEFT JOIN ${tableToJoin} ON ${sourceColumn} = ${columnToJoin}`;
        return this;
    }

    public or(column: string, term: string): QueryBuilder {
        this._query = `${this._query} OR ${column} LIKE '%${term}%' \n`;
        return this;
    }

    public and(column: string, term: string): QueryBuilder {
        this._query = `${this._query} AND ${column} LIKE %${term}%`;
        return this;
    }

    public skip(rowsToSkip: number): QueryBuilder {
        this._query = `${this._query} OFFSET ${rowsToSkip} ROWS \n`;
        return this;
    }

    public take(rowsToTake: number): QueryBuilder {
        this._query = `${this._query} FETCH NEXT ${rowsToTake} ROWS ONLY \n`;
        return this;
    }

    public orderBy(column: string, order: string): QueryBuilder {
        this._query = `${this._query} ORDER BY ${column} ${order}\n`;
        return this;
    }

    public insert(table: string, ...columns: string[]): QueryBuilder {
        this._query = `INSERT INTO ${table} ${ columns?.length > 0 ? "(" + columns.join(",") + ")" : ""}\n`;
        return this;
    }

    public values(...values: any[]) {
        this._query = `${this._query} VALUES (${values.join(",")})\n`;
        return this;
    }

    public build(): string {
        const query: string = this._query;
        this._query = "";
        return query;
    }
}