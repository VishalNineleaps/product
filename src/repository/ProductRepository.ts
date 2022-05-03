import { AppDataSource } from "../db/dbConfig";
import { Product } from "../entity/Product";

export class ProductRepository {

    private productRepository = AppDataSource.getRepository(Product);


    public getProduct = async (id: number) => {
        try {
            return await this.productRepository.findBy({ id })
        } catch (err) {
            throw err;
        }
    }

    public createProduct = async (product: Product) => {
        try {
            return await this.productRepository.save(product)
        } catch (err) {
            throw err;
        }
    }

    public updateProduct = async (product: Product, id: number) => {
        try {
            return await this.productRepository.update(id, product);
        } catch (err) {
            throw err;
        }
    }

    public deleteProduct = async (id: number) => {
        try {
            return await this.productRepository.delete(id)
        } catch (err) {
            throw err;
        }
    }

}