import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {Page, SortDirection} from '../../models/page';
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
  selectedSorting = '';

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    if (this.selectedSorting === '') {
      this.books$ = this.bookService.getBooks({pageIndex: this.pageNumber$ - 1});
    } else {
      this.books$ = this.bookService.getBooks({pageIndex:
          this.pageNumber$ - 1, sort: 'title', direction: this.selectedSorting as SortDirection});
    }
    this.books$.pipe(first(), ).subscribe(page => {if (!(page instanceof Error)) {this.pagesTotal$ = page.totalPages ; } });
  }
  previousPage(): void { // Function to move to the previous page
    this.pageNumber$ -= 1;
    if (this.pageNumber$ <= 0) {
      this.pageNumber$ = this.pagesTotal$;
    }
    this.ngOnInit();
  }
  nextPage(): void { // Function to move to the next page
    this.pageNumber$ += 1;
    if (this.pageNumber$ > this.pagesTotal$) {
      this.pageNumber$ = 1;
    }
    this.ngOnInit();
  }
  goToPage(): void { // Function to move to any page
    let goToPageNumber = Number((document.getElementById('goToPageNumber') as HTMLInputElement).value);
    if (goToPageNumber > this.pagesTotal$) {
      goToPageNumber = this.pagesTotal$;
    } else if (goToPageNumber < 1) {
      goToPageNumber = 1;
    }
    this.pageNumber$ = goToPageNumber;
    this.ngOnInit();
  }
  onSelected(sorting: string): void {
    this.selectedSorting = sorting;
    this.ngOnInit();
  }

}
