import { graphqlHTTP } from "express-graphql"
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import RestaurantService from "./services/restaurant";
const apiMiddleware = graphqlHTTP;

const restaurantService = new RestaurantService();

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    restaurantId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    deliveryTime: { type: new GraphQLNonNull(GraphQLInt) },
  }
});

const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root of all query types',
  fields: {
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve: async () => {
        return await restaurantService.getAllRestaurants();
      }
    },
    restaurant: {
      type: RestaurantType,
      args: {
        restaurantId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await restaurantService.findRestaurantById(args.restaurantId)
      }
    }
  }
})

const apiSchema = new GraphQLSchema({
  query: rootQueryType
})

export const rootEndpoint = '/graphql';

export default apiMiddleware({
  graphiql: process.env.NODE_ENV! === 'development',
  schema: apiSchema
});