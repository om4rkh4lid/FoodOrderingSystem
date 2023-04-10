class MenuItem {
  private _id: number;
  private _restaurantId: number;
  private _name: string;
  private _price: number;
  private _description?: string;
  private _photo?: any;

  constructor(id: number, name: string, price: number, description: string, photo: string, restaurantId: number) {
    this._id = id;
    this._restaurantId = restaurantId;
    this._name = name;
    this._photo = photo;
    this._price = price;
    this._description = description;
  }

  public get id() {
    return this._id;
  }
  
  public get restaurantId() {
    return this._id;
  }

  public get name() {
    return this._name;
  }
   
  public get price() {
    return this._price;
  } 

  public get photo() {
    return this._photo;
  }

  public get description() {
    return this._description;
  }
  

}

export default MenuItem;