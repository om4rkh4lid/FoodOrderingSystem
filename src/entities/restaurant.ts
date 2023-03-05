class Restaurant {
  private userId: number;
  private restaurantId: number;
  private photo?: any;
  private category?: any;
  private name: string;
  private deliveryTime: number;

  constructor(userId: number, restaurantId: number, name: string, deliveryTime: number, photo?: any, category?: any) {
    this.userId = userId;
    this.restaurantId = restaurantId;
    this.name = name;
    this.deliveryTime = deliveryTime;
    this.photo = photo;
    this.category = category;
  }

}

export default Restaurant;