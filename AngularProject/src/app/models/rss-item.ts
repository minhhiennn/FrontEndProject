export class Rss {
  author: string;
  content: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
  constructor(author: string, content: string, description: string, link: string, pubDate: string, thumbnail: string, title: string) {
    this.author = author;
    this.content = content;
    this.description = description;
    this.link = link;
    this.pubDate = pubDate;
    this.thumbnail = thumbnail;
    this.title = title;
  }
  getTime() {
    return this.pubDate.slice(11);
  }
  getDate() {
    return this.pubDate.slice(0,10);
  }
}
