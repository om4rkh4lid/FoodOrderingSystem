class Address {
  private _id: number;
  private _userId: number;
  private _street: string;
  private _building: number;
  private _floor: number;
  private _description?: string;
  private _alias?: string;
  
  constructor(id: number, userId: number, street: string, building: number, floor: number, description: string, alias: string) {
    this._id = id;
    this._userId = userId;
    this._street = street;
    this._building = building;
    this._floor = floor;
    this._description = description;
    this._alias = alias;
  }
  
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get userId(): number {
    return this._userId;
  }
  public set userId(value: number) {
    this._userId = value;
  }
  public get building(): number {
    return this._building;
  }
  public set building(value: number) {
    this._building = value;
  }
  public get floor(): number {
    return this._floor;
  }
  public set floor(value: number) {
    this._floor = value;
  }
  public get alias(): string | undefined {
    return this._alias;
  }
  public set alias(value: string | undefined) {
    this._alias = value;
  }
  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }
  public get street(): string {
    return this._street;
  }
  public set street(value: string) {
    this._street = value;
  } 
}

export default Address;