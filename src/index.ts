import express from 'express'
import bodyParser from 'body-parser'
import { errorHandler } from './middleware/ErrorMiddleware'
import { ProductRouter } from './router/ProductRouter'
import { UserRouter } from './router/UserRouter'
import dotenv from 'dotenv'
import { graphqlHTTP } from 'express-graphql'
import{ ProductGraphQlController} from './controller/ProductGraphQlController'
class Index {
    private productRouter: ProductRouter;
    private userRouter: UserRouter;
    private productGraphController:ProductGraphQlController
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.productRouter = new ProductRouter();
        this.userRouter = new UserRouter();
        this.productGraphController = new ProductGraphQlController()
        this.routes();
    }

    public configuration() {
        this.app.use(errorHandler)
        this.app.use(bodyParser.json())
        this.app.set('port', process.env.SERVER_PORT || 9000);
    }

    public start() {
        dotenv.config();
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening to port : ${this.app.get('port')}`);
        })
    }

    public routes() {
        this.app.use('/api/product/', this.productRouter.router);
        this.app.use('/api/user/', this.userRouter.router);
        this.app.get('/', (req, res) => {
            res.send('Service is working on the given port')
        })
        this.app.use('/api/graphql', graphqlHTTP({
            graphiql: true,
            schema: this.productGraphController.productSchemaDefinition
        }))
    }

}

const index = new Index().start();









