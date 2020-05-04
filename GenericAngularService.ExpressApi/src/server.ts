import * as bodyParser from "body-parser";

import { App } from "./app";
import { CompanyController } from "./controllers/company.controller";

const app: App = new App({
    port: process.env.PORT || 4000,
    controllers: [
        new CompanyController()
    ],
    middleware: [       
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
});

app.listen();