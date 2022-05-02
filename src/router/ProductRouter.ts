import { Router } from "express"
import { AppDataSource } from "../db/dbConfig"
import { ProductController } from '../controller/ProductController'



export class ProductRouter {

    public router: Router;
    public productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
        this.routes();
    }

    public routes() {
        AppDataSource.initialize()
            .then(() => {
                this.router.get('/:id', this.productController.getProduct);
                this.router.post('/', this.productController.createProduct);
                this.router.put('/:id', this.productController.updateProduct);
                this.router.delete('/:id', this.productController.deleteProduct);
            }).
            catch((error) => {
                console.log(error)
            })
    }
}

