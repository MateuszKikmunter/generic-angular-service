import { Request, Response, Router, NextFunction } from 'express';

import { validationResult, check, ValidationChain } from "express-validator";

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
        this.router.post(`${this.baseUrl}/GetTableData`, async (req: Request, res: Response, next: NextFunction) => {
            await this.getAllEmployees(req, res, next);
        });

        this.router.post(this.baseUrl, this.getValidationChain() , async(req: Request, res: Response, next: NextFunction) => {

            const validationErrors = validationResult(req);
            if(!validationErrors.isEmpty()) {
                return res.status(HttpCode.UNPROCESSABLE_ENTITY).json(validationErrors.array().map(e => e.msg));
            }

            await this.add(req, res, next);
        });

        this.router.put(`${this.baseUrl}/:id`, this.getValidationChain(), async(req: Request, res: Response, next: NextFunction) => {

            const validationErrors = validationResult(req);
            if(!validationErrors.isEmpty()) {
                return res.status(HttpCode.UNPROCESSABLE_ENTITY).json(validationErrors.array().map(e => e.msg));
            }

            const employeeExists = await this._repository.employeeExists(req.params.id);
            if(!employeeExists) {
                res.status(HttpCode.NOT_FOUND).send();
            } else{
                await this.edit(req, res, next);
            }            
        });

        this.router.delete(`${this.baseUrl}/:id`, async(req: Request, res: Response, next: NextFunction) => {
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

    private getValidationChain(): ValidationChain[] {
        return [
            check("firstName").isLength({ min: 1, max: 255 }).withMessage("First Name cannot be empty"),
            check("lastName").isLength({ min: 1, max: 255 }).withMessage("Last Name cannot be empty"),
            check("email").isLength({ min: 1, max: 255 }).withMessage("Email cannot be empty").isEmail().withMessage("Please provide correct email"),
            check("active").notEmpty().withMessage("Active cannot be empty"),
        ]
    }
}