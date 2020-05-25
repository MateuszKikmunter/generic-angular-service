import { Request, Response, Router, NextFunction } from 'express';

import { DataTablesOptions } from './../models/data-tables/data-tables.options';
import { CompanyRepository } from '../services/company.repository';
import { HttpCode } from '../utils/enums/http.code';

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
        });

        this.router.post(this.baseUrl, async (req, res, next) => {
            await this.add(req, res, next);
        });

        this.router.get(this.baseUrl, async (req, res, next) => {
            await this.getAll(req, res, next);
        });

        this.router.put(`${this.baseUrl}/:id`, async(req, res, next) => {
            const companyExists = await this._repository.companyExists(req.params.id);
            if(!companyExists) {
                res.status(HttpCode.NOT_FOUND).send();
            } else{
                await this.edit(req, res, next);
            }            
        });

        this.router.delete(`${this.baseUrl}/:id`, async(req, res, next) => {
            const companyExists = await this._repository.companyExists(req.params.id);
            if(!companyExists) {
                res.status(HttpCode.NOT_FOUND).send();
            } else {
                await this.delete(req, res, next);
            }
        })
    }

    private async getDataTablesData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dtOptions: DataTablesOptions = req.body;
            const result = await this._repository.getDataTablesData(dtOptions);

            res.status(HttpCode.OK).json(result);
        } catch (error) {
            console.log(error);
            res.status(HttpCode.SERVER_ERROR).send(error.message);
        }
    }

    private async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this._repository.getAll();
            res.status(HttpCode.OK).json(result);
        } catch (error) {
            console.log(error);            
            res.status(HttpCode.SERVER_ERROR).send(error.messsage);
        }
    }

    private async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._repository.edit(req.params.id, req.body);
            res.status(HttpCode.NO_CONTENT).send();
        } catch (error) {
            console.log(error);
            res.status(HttpCode.SERVER_ERROR).send(error.message);
        }
    }

    private async add(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._repository.add(req.body);
            res.status(HttpCode.CREATED).send();
        } catch (error) {
            console.log(error);
            res.status(HttpCode.SERVER_ERROR).send(error.messsage);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._repository.delete(req.params.id);
            res.status(HttpCode.NO_CONTENT).send();
        } catch (error) {
            console.log(error);
            res.status(HttpCode.SERVER_ERROR).send(error.message);
        }
    }
}