import { graphqlHTTP } from "express-graphql"
import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import RestaurantService from "./services/restaurant";
import RestaurantRepository from "./repositories/restaurant";
import Config from "./config";
import MenuService from "./services/menu";
import MenuRepository from "./repositories/menu";
import AddressService from "./services/address";
import AddressRepository from "./repositories/address";
import OrderRepository from "./repositories/order";
import OrderService from "./services/order";

const apiMiddleware = graphqlHTTP;

const restaurantRepository = new RestaurantRepository();
const menuRepository = new MenuRepository();
const addressRepository = new AddressRepository();
const orderRepository = new OrderRepository();

const menuService = new MenuService(menuRepository);
const restaurantService = new RestaurantService(restaurantRepository);
const addressService = new AddressService(addressRepository);
const orderService = new OrderService(orderRepository);



const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: {
    restaurantId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    photoUrl: { type: new GraphQLNonNull(GraphQLString) },
    deliveryTime: { type: new GraphQLNonNull(GraphQLInt) },
    categories: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
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

const OrderItemType = new GraphQLInputObjectType({
  name: 'OrderItem',
  fields: {
    itemId: { type: new GraphQLNonNull(GraphQLInt) },
    qty: { type: new GraphQLNonNull(GraphQLInt) },
  }
});

const FindOrderItemType = new GraphQLObjectType({
  name: 'FindOrderItem',
  fields: {
    item: { type: MenuItemType },
    qty: { type: new GraphQLNonNull(GraphQLInt) },
  }
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
    orderId: { type: GraphQLInt }
  }
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: {
    clientId: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }
});

const FindOrderType = new GraphQLObjectType({
  name: 'FindOrder',
  fields: {
    restaurant: { type: RestaurantType },
    address: { type: AddressType },
    client: { type: ClientType },
    items: { type: new GraphQLList(FindOrderItemType) },
    status: { type: new GraphQLNonNull(GraphQLString) }
  }
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
      resolve: async (parent, args) => {
        return await menuService.findItemById(args.itemId);
      }
    },
    cartItems: {
      type: new GraphQLList(new GraphQLNonNull(MenuItemType)),
      args: {
        idList: { type: new GraphQLList(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await menuService.findItems(args.idList);
      }
    },
    addresses: {
      type: new GraphQLNonNull(new GraphQLList(AddressType)),
      args: {
        clientId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await addressService.findByClientId(args.clientId);
      }
    },
    findOrder: {
      type: FindOrderType,
      args: {
        orderId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await orderService.findById(args.orderId);
      }
    }
  }
})

const rootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root of all Mutation types',
  fields: {
    createOrder: {
      type: OrderType,
      args: {
        clientId: { type: new GraphQLNonNull(GraphQLInt) },
        restaurantId: { type: new GraphQLNonNull(GraphQLInt) },
        addressId: { type: new GraphQLNonNull(GraphQLInt) },
        orderItems: { type: new GraphQLNonNull(new GraphQLList(OrderItemType)) }
      },
      resolve: async (parent, args) => {
        return await orderService.create(args.clientId, args.restaurantId, args.addressId, args.orderItems);
      }
    },
  }
});

const apiSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
})

export const rootEndpoint = '/graphql';

export default apiMiddleware({
  graphiql: Config.server.mode === 'development',
  schema: apiSchema
});