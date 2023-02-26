import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import {first, Observable} from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$: Observable<Page<Book> | Error>;
  pageNumber$: number = Number(1); // The default page is number 1 aka the first page
  pagesTotal$: number;

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({pageIndex: this.pageNumber$ - 1}); // Page numbers go from 0...49
    this.books$.pipe(first(), ).subscribe(page => {if (!(page instanceof Error)) {this.pagesTotal$ = page.totalPages ; } });
  }
  previousPage(): void { // Function to move to the previous page
    this.pageNumber$ -= 1;
    if (this.pageNumber$ <= 0) {
      this.pageNumber$ = this.pagesTotal$; // This should be a variable, so if there would be less or more pages it would still work
    }
    this.books$ = this.bookService.getBooks({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  nextPage(): void { // Function to move to the next page
    this.pageNumber$ += 1;
    if (this.pageNumber$ > this.pagesTotal$) {
      this.pageNumber$ = 1;
    }
    this.books$ = this.bookService.getBooks({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  goToPage(): void {
    let goToPageNumber = Number((document.getElementById('goToPageNumber') as HTMLInputElement).value);
    if (goToPageNumber > this.pagesTotal$) {
      goToPageNumber = this.pagesTotal$;
    } else if (goToPageNumber < 1) {
      goToPageNumber = 1;
    }
    this.pageNumber$ = goToPageNumber;
    this.books$ = this.bookService.getBooks({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }

}
