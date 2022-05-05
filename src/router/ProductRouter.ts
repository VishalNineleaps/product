import { Router } from "express"
import { AppDataSource } from "../db/dbConfig"
import { ProductController } from '../controller/ProductController'
import { Authentication } from "../middleware/Authentication"
import { UserRole } from "../entity/User";

export class ProductRouter {

    public router: Router;
    private productController: ProductController;
    private authentication: Authentication;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
        this.authentication = new Authentication();
        this.routes();
    }

    public routes() {
        AppDataSource.initialize()
            .then(() => {
                this.router.get('/:id', this.authentication.extractJwtToken,
                    (req, res, next) => this.authentication.validateUser(req, res, next,
                        [UserRole.ADMIN, UserRole.USER]), this.productController.getProduct);

                this.router.post('/', this.authentication.extractJwtToken,
                    (req, res, next) => this.authentication.validateUser(req, res, next, [UserRole.ADMIN]),
                    this.productController.createProduct);

                this.router.put('/:id', this.authentication.extractJwtToken,
                    (req, res, next) => this.authentication.validateUser(req, res, next, [UserRole.ADMIN]),
                    this.productController.updateProduct);

                this.router.delete('/:id', this.authentication.extractJwtToken,
                    (req, res, next) => this.authentication.validateUser(req, res, next, [UserRole.ADMIN]),
                    this.productController.deleteProduct);
            }).
            catch((error) => {
                console.error(error)
            })
    }
}

