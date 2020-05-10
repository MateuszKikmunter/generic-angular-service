import * as bodyParser from "body-parser";

import { App } from "./app";
import { CompanyController } from "./controllers/company.controller";
import { EmployeeController } from './controllers/employee.controller';

const app: App = new App({
    port: process.env.PORT || 4000,
    controllers: [
        new CompanyController(),
        new EmployeeController()
    ],
    middleware: [       
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
});

app.listen();