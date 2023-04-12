import { graphqlHTTP } from "express-graphql"
import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import RestaurantService from "./services/restaurant";
import RestaurantRepository from "./repositories/restaurant";
import Config from "./config";
import MenuService from "./services/menu";
import MenuRepository from "./repositories/menu";
import AddressService from "./services/address";
import AddressRepository from "./repositories/address";

const apiMiddleware = graphqlHTTP;

const restaurantRepository = new RestaurantRepository();
const menuRepository = new MenuRepository();
const addressRepository = new AddressRepository();

const menuService = new MenuService(menuRepository);
const restaurantService = new RestaurantService(restaurantRepository);
const addressService = new AddressService(addressRepository);



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
    restaurantId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
    photo: { type: GraphQLString }
  }
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    alias: { type: GraphQLString },
    street: { type: new GraphQLNonNull(GraphQLString) },
    area: { type: new GraphQLNonNull(GraphQLString) },
    building: { type: new GraphQLNonNull(GraphQLInt) },
    floor: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
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
    addresses: {
      type: new GraphQLNonNull(new GraphQLList(AddressType)),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await addressService.findByUserId(args.userId);
      }
    }
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