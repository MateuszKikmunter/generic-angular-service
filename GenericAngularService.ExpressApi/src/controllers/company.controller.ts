import { Request, Response, Router, NextFunction } from 'express';

import { DataTablesOptions } from './../models/data-tables/data-tables.options';
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
            await this.getDataTablesData(req, res, next);
            return next();
        });

        this.router.get(this.baseUrl, async (req, res, next) => {
            await this.getAll(req, res, next);
            return next();
        });
    }

    private async getDataTablesData(req: Request, res: Response, next: NextFunction) {
        try {
            const dtOptions: DataTablesOptions = req.body;
            const result = await this._repository.getDataTablesData(dtOptions);

            res.send(result);
        } catch (err) {
            console.log(err);
            return next(err);
        }
    }

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._repository.getAll();
            res.send(result);
        } catch (error) {
            console.log(error);
            return next();
        }
    }
}