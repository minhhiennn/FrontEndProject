export class User {
  id: number;
  img: string;
  name: string;
  email: string;
  password: string;
  constructor(id: number, img: string, name: string, email: string, password: string) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.email = email;
    this.password = password;
  }

}
