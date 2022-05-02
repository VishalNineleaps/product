import express from "express";
import bodyParser from 'body-parser'
import { errorHandler } from './middleware/errorMiddleware'
import { ProductRouter } from './router/ProductRouter'
require('dotenv').config()

class Index {
    private productRouter: ProductRouter;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.productRouter = new ProductRouter;
        this.routes();
    }

    public configuration() {
        this.app.use(errorHandler)
        this.app.use(bodyParser.json())
        this.app.set('port', process.env.PORT || 9000);
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening to port : ${this.app.get('port')}`);
        })
    }

    public routes() {
        this.app.use('/api/product/', this.productRouter.router);
    }

}

const index = new Index();
index.start();








