class Restaurant {
  private _userId: number;
  private _restaurantId: number;
  private _photo?: any;
  private _category?: any;
  private _name: string;
  private _deliveryTime: number;

  constructor(userId: number, restaurantId: number, name: string, deliveryTime: number, photo?: any, category?: any) {
    this._userId = userId;
    this._restaurantId = restaurantId;
    this._name = name;
    this._deliveryTime = deliveryTime;
    this._photo = photo;
    this._category = category;
  }

  public get userId() {
    return this._userId
  }
  public get restaurantId() {
    return this._restaurantId;
  }
  public get photo() {
    return this._photo;
  }
  public get category() {
    return this._category;
  }
  public get name() {
    return this._name;
  }
  public get deliveryTime() {
    return this._deliveryTime;
  }

}

export default Restaurant;