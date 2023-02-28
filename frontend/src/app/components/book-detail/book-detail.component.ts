import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book | Error>;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.bookService.getBook(id)));
  }
  openDialog(title: string): void {
    // Got the code and idea from here: https://www.javachinna.com/angular-confirmation-dialog/
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Do you want to delete a book called "' + title + '"?',
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteBook();
      }
    });

  }
  deleteBook(): void {
    this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.bookService.deleteBook(id)));
  }

}
