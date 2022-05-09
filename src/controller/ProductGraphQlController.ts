import { number, string } from "@hapi/joi";
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { ProductGraphQlSchema } from "../schema/ProductGraphQlSchema"
import { ProductGraphQlService } from "../service/ProductGraphQlService";

export class ProductGraphQlController {
    private productGraphQlService: ProductGraphQlService;

    constructor() {
        this.productGraphQlService = new ProductGraphQlService();

    }


    private productQueryType = new GraphQLObjectType({
        name: 'Query',
        description: 'Root query',
        fields: () => ({
            products: {
                type: new GraphQLList(ProductGraphQlSchema),
                description: 'List of all products',
                resolve: () => { return this.productGraphQlService.listOfProducts() }
            },
            product: {
                type: new GraphQLList(ProductGraphQlSchema),
                description: 'A single product',
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (parent, args) => {
                    product: ProductGraphQlSchema
                    const product = this.productGraphQlService.findProductById(args.id)
                    return product
                }
            }

        })
    })

    private productMutationType = new GraphQLObjectType({
        name: 'Mutation',
        description: 'Root mutation',
        fields: () => ({

            createProduct: {
                type: ProductGraphQlSchema,
                description: 'Create a new product',
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    price: { type: new GraphQLNonNull(GraphQLInt) },
                    description: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (parent, args) => { return this.productGraphQlService.createProduct(args) }
            },


            updateProduct: {
                type: ProductGraphQlSchema,
                description: 'Update a product',
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                    name: { type: GraphQLString },
                    price: { type: new GraphQLNonNull(GraphQLInt) },
                    description: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (parent, args) => { return this.productGraphQlService.updateProduct(args) }
            },

            deleteProduct: {
                type: ProductGraphQlSchema,
                description: 'Delete a product',
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve: (parent, args) => { return this.productGraphQlService.deleteProduct(args.id) }
            }

        })
    })


    public productSchemaDefinition = new GraphQLSchema({
        query: this.productQueryType,
        mutation: this.productMutationType
    })



}

