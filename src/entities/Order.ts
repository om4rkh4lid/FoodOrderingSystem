import Address from "./address";
import MenuItem from "./menu-item";
import Restaurant from "./restaurant";

type OrderItem = {
  item: MenuItem;
  qty: number;
}

export type Client = {
  clientId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface Order {
  orderId: number;
  restaurant: Restaurant;
  address: Address;
  items: OrderItem[];
  status: string;
  client: Client;
}