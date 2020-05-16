import { QueryBuilder } from './query.builder';
import { ConnectionPool } from "mssql";

export abstract class Reposiory {

    protected _queryBuilder: QueryBuilder;

    constructor() {
        this._queryBuilder = new QueryBuilder();
    }

    protected async getCount(connection: ConnectionPool, table: string): Promise<number> {
        const query = `SELECT COUNT(*) as count FROM ${ table }`;
        const result =  await connection.query(query);
        return result.recordset[0].count as number;
    }
}