import { GraphQLInputField } from "graphql";
import { ProductGraphQlSchema } from "../schema/ProductGraphQlSchema";
import { ProductGraphQlRepository } from "../repository/ProductGraphQLRepository";
import { OperationCanceledException } from "typescript";
import { Product } from "../entity/Product";

export class ProductGraphQlService {


    private productGraphQlRepository: ProductGraphQlRepository;

    constructor() {
        this.productGraphQlRepository = new ProductGraphQlRepository();
    }

    public listOfProducts = () => {
        return productList;
    }

    public findProductById = (id: any) => {
        return productList.filter((product) => product.id == id)
    }


    createProduct = (args: any) => {

        const product = {
            id: productList.length + 1,
            name: args.name, price: args.price,
            description: args.description
        }
        productList.push(product);
        return product
    }


    updateProduct(args: any) {

        productList.filter(product => {
            if (product.id == args.id) {
                product.name = args.name
                product.price = args.price
                product.description = args.description
                return product
            } else {
                return false
            }

        })
    }


    deleteProduct(id: number) {
        console.log("deleteProduct : id: " + id)
        productList.splice(productList.findIndex(
            product => product.id == id), 1)
        console.log('After delettion, listOfProducts: ' + productList)
        return 'product deleted successfully'

    }
}



var productList = [
    { id: 1, name: 'chair', price: 1200, description: 'wooden chair' },
    { id: 2, name: 'table', price: 2000, description: 'wooden table' }
]

