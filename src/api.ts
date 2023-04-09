import { graphqlHTTP } from "express-graphql"
import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import RestaurantService from "./services/restaurant";
import RestaurantRepository from "./repositories/restaurant";
import Config from "./config";
import MenuService from "./services/menu";
import MenuRepository from "./repositories/menu";

const apiMiddleware = graphqlHTTP;

const restaurantRepository = new RestaurantRepository();
const menuRepository = new MenuRepository();

const menuService = new MenuService(menuRepository);
const restaurantService = new RestaurantService(restaurantRepository);



const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    restaurantId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    photoUrl: { type: new GraphQLNonNull(GraphQLString) },
    deliveryTime: { type: new GraphQLNonNull(GraphQLInt) },
    categories: { type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
  }
});

const MenuItemType = new GraphQLObjectType({
  name: 'MenuItem',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
    photo: { type: GraphQLString }
  }
});

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(MenuItemType))}
  },
});

const rootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root of all query types',
  fields: {
    allRestaurants: {
      type: new GraphQLList(RestaurantType),
      resolve: async () => {
        return await restaurantService.getAllRestaurants();
      }
    },
    restaurantWithId: {
      type: RestaurantType,
      args: {
        restaurantId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await restaurantService.findRestaurantById(args.restaurantId)
      }
    },
    restaurantsWithNameLike: {
      type: new GraphQLList(RestaurantType),
      args: {
        nameQuery: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        return await restaurantService.findRestaurantsWithNameLike(args.nameQuery);
      }
    },
    menu: {
      type: new GraphQLNonNull(new GraphQLList(MenuItemType)),
      args: {
        restaurantId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await menuService.findForRestaurantWithId(args.restaurantId)
      }
    },
    menuItem: {
      type: MenuItemType,
      args: {
        itemId: { type: new GraphQLNonNull(GraphQLInt) }
      }, 
      resolve: async (parent, args) =>{
        return await menuService.findItemById(args.itemId);
      }
    },
    cartItems: {
      type: new GraphQLList(new GraphQLNonNull(MenuItemType)),
      args: {
        idList: { type: new GraphQLList(GraphQLInt) }
      }, 
      resolve: async (parent, args) =>{
        return await menuService.findItems(args.idList);
      }
    },
  }
})

const apiSchema = new GraphQLSchema({
  query: rootQueryType
})

export const rootEndpoint = '/graphql';

export default apiMiddleware({
  graphiql: Config.server.mode === 'development',
  schema: apiSchema
});