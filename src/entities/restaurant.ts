class Restaurant {
  private _restaurantId: number;
  private _photoUrl: string;
  private _categories: string[];
  private _name: string;
  private _deliveryTime: number;


  constructor(restaurantId: number, name: string, deliveryTime: number, categories: string[], photoUrl: string) {
    this._restaurantId = restaurantId;
    this._name = name;
    this._deliveryTime = deliveryTime;
    this._photoUrl = photoUrl;
    this._categories = categories;
  }

  public get restaurantId() {
    return this._restaurantId;
  }
  public get photoUrl() {
    return this._photoUrl;
  }
  public get categories() {
    return this._categories;
  }
  public get name() {
    return this._name;
  }
  public get deliveryTime() {
    return this._deliveryTime;
  }

}

export default Restaurant;