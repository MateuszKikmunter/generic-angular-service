import { Request, Response, Router } from 'express'

export class HelloController {

    readonly baseUrl: string = "/hello";
    readonly router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(this.baseUrl, this.helloWorld);
    }

    private helloWorld(req: Request, res: Response): void {
        res.send({ message: "Hello world!" });
    }
}