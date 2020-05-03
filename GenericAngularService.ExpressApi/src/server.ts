import * as bodyParser from "body-parser";

import { HelloController } from './controllers/hello.controller';
import { App } from "./app";

const app: App = new App({
    port: process.env.PORT || 4000,
    controllers: [
        new HelloController()
    ],
    middleware: [       
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ]
});


app.listen();