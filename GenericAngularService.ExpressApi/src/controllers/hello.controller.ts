import { Request, Response, Router } from 'express'
import { ConnectionPool } from "mssql";

import { SqlConfiguration } from './../utils/sql.configuration';

export class HelloController {

    readonly baseUrl: string = "/hello";
    readonly router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.baseUrl, async (req, res, next) => {
            await this.helloWorld(req, res);
            return next();
        });
    }

    private async helloWorld(req: Request, res: Response) {
            try {
                const connection = await new ConnectionPool(SqlConfiguration.defaultConfig()).connect();
                const result = await connection.query(`select * from Companies`);
                res.send(JSON.stringify(result.recordset));
            } catch (err) {
                console.log(err);
            }

        res.send({ message: "Hello world!" });
    }
}