class Address {
  private _id: number;
  private _clientId: number;
  private _street: string;
  private _area: string;
  private _building: number;
  private _floor: number;
  private _description?: string;
  private _alias?: string;
  
  constructor(id: number, clientId: number, area: string, street: string, building: number, floor: number, description: string, alias: string) {
    this._id = id;
    this._clientId = clientId;
    this._street = street;
    this._area = area;
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
  public get clientId(): number {
    return this._clientId;
  }
  public set clientId(value: number) {
    this._clientId = value;
  }
  public get building(): number {
    return this._building;
  }
  public set building(value: number) {
    this._building = value;
  }
  public get area(): string {
    return this._area;
  }
  public set area(value: string) {
    this._area = value;
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