import { Request, Response, Router, NextFunction } from 'express';

import { DataTablesOptions } from './../models/data-tables/data-tables.options';
import { EmployeeRepository } from '../services/employee.repository';

export class EmployeeController {

    readonly baseUrl: string = "/api/employees";
    readonly router: Router = Router();

    private _repository: EmployeeRepository = new EmployeeRepository();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.baseUrl}/GetTableData`, async (req, res, next) => {
            await this.getAllEmployees(req, res, next);
            return next();
        });
    }

    private async getAllEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const dtOptions: DataTablesOptions = req.body;
            const result = await this._repository.getAll(dtOptions);

            res.send(result);
        } catch (err) {
            console.log(err);
            return next(err);
        }
    }
}