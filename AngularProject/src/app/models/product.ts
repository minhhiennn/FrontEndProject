export class Product {
  private id: number;
  private price: number;
  private name: string;
  private img: string;
  constructor(id: number, price: number, name: string, img: string) {
    this.id = id;
    this.price = price;
    this.name = name;
    this.img = img;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getPrice(): number {
    return this.price;
  }
  setPrice(price: number) {
    this.price = price;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getImg(): string {
    return this.img;
  }
  setImg(img: string) {
    this.img = img;
  }
}
