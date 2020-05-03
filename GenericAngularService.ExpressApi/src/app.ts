import express from "express";
import { Application } from "express";

import { ApplicationConfig } from './models/application.config';

export class App {

    private _application: Application;
    private _port: number;

    constructor(configuration: ApplicationConfig) {
        this._application = express();
        this._port = configuration.port;

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
}