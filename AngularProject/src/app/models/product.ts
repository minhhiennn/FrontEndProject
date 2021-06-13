export class Product {
  id: number;
  price: number;
  name: string;
  img: string;
  constructor(id: number, price: number, name: string, img: string) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.img = img;
  }
}
