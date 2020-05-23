import { Request, Response, Router, NextFunction } from 'express';

import { DataTablesOptions } from './../models/data-tables/data-tables.options';
import { EmployeeRepository } from '../services/employee.repository';
import { HttpCode } from './../utils/enums/http.code';

export class EmployeeController {

    readonly baseUrl: string = "/api/employees";
    readonly router: Router = Router();

    private _repository: EmployeeRepository = new EmployeeRepository();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.baseUrl}/GetTableData`, async (req, res, next) => {
            await this.getAllEmployees(req, res, next);
        });

        this.router.post(this.baseUrl, async(req, res, next) => {
            await this.add(req, res, next);
        });

        this.router.put(`${this.baseUrl}/:id`, async(req, res, next) => {
            const employeeExists = await this._repository.employeeExists(req.params.id);
            if(!employeeExists) {
                res.status(HttpCode.NOT_FOUND).send();
            } else{
                await this.edit(req, res, next);
            }            
        });

        this.router.delete(`${this.baseUrl}/:id`, async(req, res, next) => {
            const employeeExists = await this._repository.employeeExists(req.params.id);
            if(!employeeExists) {
                res.status(HttpCode.NOT_FOUND).send();
            } else {
                await this.delete(req, res, next);
            }
        });
    }

    private async getAllEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dtOptions: DataTablesOptions = req.body;
            const result = await this._repository.getAll(dtOptions);

            res.status(HttpCode.OK).json(result);
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
            res.status(HttpCode.SERVER_ERROR).send(error.message);
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

    private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this._repository.delete(req.params.id);
            res.status(HttpCode.NO_CONTENT).send();
        } catch (error) {
            console.log(error);
            res.status(HttpCode.BAD_REQUEST).send(error.message);
        }
    }
}