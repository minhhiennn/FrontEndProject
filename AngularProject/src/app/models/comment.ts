export class Comment {

    private nameUser?: string;
    private idProduct: number;
    private star: number;
    private text: string;
    private date: Date;
    private index: number;

  constructor($idProduct: number, $star: number, $text: string, $date: Date, $index: number, $nameUser?: string) {
		this.nameUser = $nameUser;
		this.idProduct = $idProduct;
		this.star = $star;
		this.text = $text;
		this.date = $date;
		this.index = $index;
	}

	


    /**
     * Getter $nameUser
     * @return {string}
     */
  public get $nameUser(): string | undefined{
		return this.nameUser;
	}

    /**
     * Getter $idProduct
     * @return {number}
     */
	public get $idProduct(): number {
		return this.idProduct;
	}

    /**
     * Getter $star
     * @return {number}
     */
	public get $star(): number {
		return this.star;
	}

    /**
     * Getter $text
     * @return {string}
     */
	public get $text(): string {
		return this.text;
	}

    /**
     * Getter $date
     * @return {Date}
     */
	public get $date(): Date {
		return this.date;
	}

    /**
     * Getter $key
     * @return {number}
     */
	public get $index(): number {
		return this.index;
	}

    /**
     * Setter $nameUser
     * @param {string} value
     */
  public set $nameUser(value: string | undefined) {
		this.nameUser = value;
	}

    /**
     * Setter $idProduct
     * @param {number} value
     */
	public set $idProduct(value: number) {
		this.idProduct = value;
	}

    /**
     * Setter $star
     * @param {number} value
     */
	public set $star(value: number) {
		this.star = value;
	}

    /**
     * Setter $text
     * @param {string} value
     */
	public set $text(value: string) {
		this.text = value;
	}

    /**
     * Setter $date
     * @param {Date} value
     */
	public set $date(value: Date) {
		this.date = value;
	}

    /**
     * Setter $key
     * @param {number} value
     */
	public set $index(value: number) {
		this.index = value;
	}

	
}
