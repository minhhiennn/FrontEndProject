import { Product } from "./product";

export class CartItem {
  id: number;
  id_User?: number;
  product: Product;
  quantity: number;
  price_total: number;
  constructor(id: number, product: Product, quantity: number, price_total: number, id_User?: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.price_total = price_total;
    this.id_User = id_User;
  }
}
