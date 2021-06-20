export class ItemFeed {
  date: string;
  time: string;
  title: string;
  imgUrl: string;
  details: string;
  constructor(date: string, time: string, title: string, imgUrl: string, details: string) {
    this.date = date;
    this.time = time;
    this.title = title;
    this.imgUrl = imgUrl;
    this.details = details;
  }
}
