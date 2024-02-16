export default class OrderItem {
  private readonly _id: string;
  private _total: number;
  private readonly _name: string;
  private readonly _productId: string;
  private readonly _price: number;
  private readonly _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this._total = this.total();
  }
  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  total(): number {
    return this._price * this._quantity;
  }
}
