export class Voucher {
  code: string
  quantity: number
  type: string
  content: string
  condition: string
  discount: number
  dateBegin: Date
  dateEnd: Date
  constructor(code: string, quantity: number, type: string, content: string, condition: string, discount: number, dateBegin: Date, dateEnd: Date) {
    this.code = code;
    this.quantity = quantity;
    this.type = type;
    this.content = content;
    this.condition = condition;
    this.discount = discount;
    this.dateBegin = dateBegin;
    this.dateEnd = dateEnd;
  }
}
