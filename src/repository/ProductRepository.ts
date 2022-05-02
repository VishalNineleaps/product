import { AppDataSource} from "../db/dbConfig";
import { Product } from "../entity/Product";

export class ProductRepository {

    private productRepository =AppDataSource.getRepository(Product);


    public getProduct = async (id: number) => {
        try {
            const product = await this.productRepository.findBy({ id })
            return product;
        } catch (err) {
            throw err;
        }
    }

    public createProduct = async (product: Product) => {
        try {
            const newproduct = await this.productRepository.save(product)
            return newproduct;
        } catch (err) {
            throw err;
        }
    }

    public updateProduct = async (product: Product, id: number) => {
        try {
            const updatedProduct = await this.productRepository.update(id, product);
            return updatedProduct;
        } catch (err) {
            throw err;
        }
    }

    public deleteProduct = async (id: number) => {
        try {
            const deletedProduct = await this.productRepository.delete(id)
            return deletedProduct;
        } catch (err) {
            throw err;
        }
    }

}