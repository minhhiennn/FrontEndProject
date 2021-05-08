import { Product } from "./product";

export class CartItem {
  private product: Product;
  private quantity: number;
  private price_total: number;
  constructor(product: Product, quantity: number, price_total: number) {
    this.product = product;
    this.quantity = quantity;
    this.price_total = price_total;
  }
  getProduct(): Product {
    return this.product;
  }
  setProduct(product: Product) {
    this.product = product;
  }
  getQuantity(): number {
    return this.quantity;
  }
  setQuantity(quantity: number) {
    if (quantity >= 1) {
       this.quantity = quantity;
    }
  }
  getPriceTotal(): number {
    return this.price_total;
  }
  setPriceTotal(price_total: number) {
    this.price_total = price_total;
  }
}
