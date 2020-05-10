import { DataTablesOptions } from './../models/data-tables/data-tables.options';
import { Request, Response, Router, NextFunction } from 'express'

import { CompanyRepository } from '../services/company.repository';

export class CompanyController {

    readonly baseUrl: string = "/api/companies";
    readonly router: Router = Router();

    private _repository: CompanyRepository = new CompanyRepository();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.baseUrl}/GetTableData`, async (req, res, next) => {
            await this.getAllCompanies(req, res, next);
            return next();
        });
    }

    private async getAllCompanies(req: Request, res: Response, next: NextFunction) {
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