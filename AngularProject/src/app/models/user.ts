export class User {
  private id: number;
  private name: string;
  private email: string;
  private password: string;
  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number) {
    this.id = id;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name
  }
  getEmail() {
    return this.email;
  }
  setEmail(email: string) {
    this.email = email;
  }
  getPassword() {
    return this.password;
  }
  setPassword(password: string) {
    this.password = password;
  }
}
