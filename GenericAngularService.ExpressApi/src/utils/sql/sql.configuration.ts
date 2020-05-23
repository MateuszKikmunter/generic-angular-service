import { config } from 'mssql';

export class SqlConfiguration {

    public static defaultConfig(): config {
        return {
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            server: process.env.SQL_SERVER || "",
            database: process.env.SQL_DATABASE || "",
            port: Number(process.env.SQL_PORT),
            options: {
                encrypt: process.env.SQL_ENCRYPT === "true"
            }
        };
    }
}