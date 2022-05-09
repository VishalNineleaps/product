import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";


export const ProductGraphQlSchema = new GraphQLObjectType({
    name: "Product",
    description: "Represents a product having information about it",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
    }
    )

});