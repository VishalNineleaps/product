import { Product } from "../entity/Product"
import { productSchema } from "../middleware/ValidationSchema"
import { Request, Response, Router } from "express"
import { ProductRepository } from "../repository/ProductRepository";


export class ProductController {

    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    // @desc Get Product
    // @route GET /product/{id}
    public getProduct = async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await this.productRepository.getProduct(Number(id));
        res.send(product); //todo: remove json
    }

    // @desc Create Product
    // @route POST /product/{id}
    public createProduct = async (req: Request, res: Response) => {
        try {

            await productSchema.validateAsync(req.body)

            const product = convertJsonToEntity(req);
            const newProduct = await this.productRepository.createProduct(product);
            res.send(newProduct);
        } catch (err) {
            res.status(422).send(err);
        }

    }

    // @desc Update Product
    // @route PUT /product/{id}
    public updateProduct = async (req: Request, res: Response) => {
        try {
            await productSchema.validateAsync(req.body)
            const product = convertJsonToEntity(req);
            const id = req.params.id;
            const updatedProduct = await this.productRepository.updateProduct(product, Number(id));
            res.send(updatedProduct);
        } catch (err) {
            res.status(422).send(err)
        }
    }

    // @desc Delete Product
    // @route DELETE /product/{id}
    public deleteProduct = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.productRepository.deleteProduct(Number(id));
            res.send('Product deleted successfully');
        } catch (err) {
            res.send(err)
        }

    }



}

function convertJsonToEntity(req: Request) {
    return new Product(
        req.body.name,
        req.body.price,
        req.body.inventory,
        req.body.description)

}
