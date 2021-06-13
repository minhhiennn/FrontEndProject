import { Product } from "./product";

export class CartItem {
  id: number;
  product: Product;
  quantity: number;
  price_total: number;
  constructor(id: number, product: Product, quantity: number, price_total: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.price_total = price_total;
  }
}
