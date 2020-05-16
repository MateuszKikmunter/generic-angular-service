import { ConnectionPool } from 'mssql';

import { SqlConfiguration } from './sql.configuration';

export class SqlConnection {

    private static _instance: SqlConnection;
    private static _pool: ConnectionPool;

    private constructor() {

    }

    public static instance(): SqlConnection {
        if(!SqlConnection._instance) {
            SqlConnection._instance = new SqlConnection();
        }

        if(!SqlConnection._pool) {
            SqlConnection._pool = new ConnectionPool(SqlConfiguration.defaultConfig());
        }

        return SqlConnection._instance;
    }

    public static pool(): ConnectionPool {
        if(!SqlConnection._instance || !SqlConnection._pool) {
            this.instance();
        }

        return SqlConnection._pool;
    }
}