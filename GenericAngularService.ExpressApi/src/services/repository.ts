import { SqlConnection } from '../utils/sql.connection';

import { QueryBuilder } from './query.builder';

export abstract class Reposiory {

    protected _queryBuilder: QueryBuilder;

    constructor() {
        this._queryBuilder = new QueryBuilder();
    }

    protected async getCount(table: string): Promise<number> {
        const query = `SELECT COUNT(*) as count FROM ${ table }`;
        const connection = await SqlConnection.connectionPool().connect();
        const result =  await connection.query(query);
        connection.close();
        return result.recordset[0].count as number;
    }

    protected async getById<T>(id: string, table: string): Promise<T> {
        const query = this._queryBuilder
            .select("*")
            .from(table)
            .where("Id", id, true)
            .build();

        const connection = await SqlConnection.connectionPool().connect();
        const result = await connection.query(query);
        connection.close();

        return result.rowsAffected[0] === 1 ? result.recordset[0] : null;
    }
}