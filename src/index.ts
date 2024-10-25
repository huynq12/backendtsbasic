console.log("Hello world");

class Book {
  private id: number;
  private title: string;
  private author: string;
  private publicationYear: number;
  private availableCopies: number;
  private totalBorrows: number;

  constructor(
    id: number,
    title: string,
    author: string,
    publicationYear: number,
    availableCopies: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.availableCopies = availableCopies;
    this.totalBorrows = 0;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getAuthor(): string {
    return this.author;
  }

  public getPublicationYear(): number {
    return this.publicationYear;
  }

  public getAvailableCopies(): number {
    return this.availableCopies;
  }

  public getTotalBorrow(): number {
    return this.totalBorrows;
  }
  public borrow(): void {
    if (this.availableCopies <= 0)
      throw new Error("This book is not available");
    this.availableCopies--;
    this.totalBorrows++;
  }

  public return(): void {
    this.availableCopies++;
  }

  public getInfo(): string {
    return `
            ID: ${this.id}
            Title: ${this.title}
            Author: ${this.author}
            Publication year: ${this.publicationYear}
            Available copies: ${this.availableCopies} 
        `;
  }

  public get available(): boolean {
    return this.availableCopies > 0;
  }
}

class Library {
  private name: string;
  private books: Book[];

  constructor(name: string) {
    this.name = name;
    this.books = [];
  }

  public getName(): string {
    return this.name;
  }

  public getBooks(): Book[] {
    return this.books;
  }

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public removeBook(bookId: number) {
    const index = this.books.findIndex((x) => x.getId() == bookId);

    if (index == -1) throw new Error("This book is not available");

    this.books.splice(index, 1);
  }

  public findBookById(bookId: number): Book {
    const item = this.books.find((x) => x.getId() == bookId);

    if (!item) throw new Error("This book is not available");

    return item;
  }

  public borrowBook(bookId: number) {
    const item = this.books.find((x) => x.getId() == bookId);

    if (!item) throw new Error("This book is not available");

    item.borrow();
  }

  public returnBook(bookId: number) {
    const item = this.books.find((x) => x.getId() == bookId);

    if (!item) throw new Error("This book is not available");

    item.return();
  }

  public getAvailableBooks(): number {
    return this.books.filter((x) => x.available).length;
  }

  public listAvaiblableBooks(): Book[] {
    return this.books.filter((x) => x.available);
  }
  public mostPopularBook(): Book {
    return this.books.reduce((mostPopular, item) =>
      item.getTotalBorrow() > mostPopular.getTotalBorrow() ? item : mostPopular
    );
  }

  public addBooks(...books: Book[]) {
    books.forEach((book) => {
      const existingBook = this.books.find((b) => b.getId() === book.getId());
      if (existingBook) {
        existingBook.return();
      } else {
        this.books.push(book);
      }
    });
  }

  public updateBookInfo(bookId: number, updatedInfo: object) {
    const item = this.books.find((x) => x.getId() == bookId);
    if (item == null) return "This book cannot found";
    Object.assign(item, updatedInfo);
  }

  public getBooksByAuthor(author: string): Book[] {
    return this.books.filter((book) =>
      book.getAuthor().toLowerCase().includes(author.toLowerCase())
    );
  }

  public getAveragePublicationYear(): number {
    if (this.books.length === 0) return 0;

    const totalYear = this.books.reduce(
      (sum, book) => sum + book.getPublicationYear(),
      0
    );
    return Math.round(totalYear / this.books.length);
  }

  public categorizeBooksByDecade(): { [key: number]: Book[] } {
    return this.books.reduce((decades: { [key: number]: Book[] }, book) => {
      const decade = Math.floor(book.getPublicationYear() / 10) * 10;
      if (!decades[decade]) {
        decades[decade] = [];
      }
      decades[decade].push(book);
      return decades;
    }, {});
  }

  findBooksByCondition(condition: (book: Book) => boolean): Book[] {
    return this.books.filter(condition);
  }
}
