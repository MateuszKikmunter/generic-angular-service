import express, { Application } from "express";

import helmet from "helmet";
import cors from "cors";

import { ApplicationConfig } from './models/application.config';

export class App {

    private _application: Application;
    private _port: string | number;

    constructor(configuration: ApplicationConfig) {
        this._application = express();
        this._port = configuration.port;

        this.initializeSecurityMiddleware();
        this.registerMiddleware(configuration?.middleware || []);
        this.registerRoutes(configuration?.controllers || []);
    }

    public listen(): void {
        this._application.listen(this._port, () => console.log(`Server is listening on PORT: ${ this._port }`));
    }

    private registerRoutes(controllers: any[]): void {
        controllers?.forEach(controller => this._application.use("/", controller.router));
    }

    private registerMiddleware(middleware: any[]): void {
        middleware?.forEach(middleware => this._application.use(middleware));
    }

    private initializeSecurityMiddleware(): void {
        this._application.use(helmet());
        this._application.use(helmet.hidePoweredBy());
        this._application.use(helmet.noSniff());
        this._application.use(helmet.xssFilter());
        this._application.use(helmet.noCache());
        this._application.use(helmet.referrerPolicy({ policy: "same-origin" }));
        this._application.use(cors());
    }
}