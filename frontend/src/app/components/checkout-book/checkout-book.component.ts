import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckoutService} from '../../services/checkout.service';
import {map, switchMap} from 'rxjs/operators';
import {first, Observable} from 'rxjs';
import {Book} from '../../models/book';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-book',
  templateUrl: './checkout-book.component.html',
  styleUrls: ['./checkout-book.component.scss']
})
export class CheckoutBookComponent implements OnInit{
  book$: Observable<Book | Error>;
  book: Book;
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private bookService: BookService,
    private dialog: MatDialog,
  ) {
  }
  checkoutBookForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.bookService.getBook(id)));
    this.book$.pipe(first(), ).subscribe(book => {if (!(book instanceof Error)) {this.book = book ; }});
  }
  checkoutConfirm(): void {
    // Got the code and idea from here: https://www.javachinna.com/angular-confirmation-dialog/
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure that you want to checkout?',
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.checkoutBook();
      }
    });
  }
  checkoutBook(): void {
    const todaysDate = new Date();
    const tomorrowsDate = new Date(todaysDate.setDate(todaysDate.getDate() + 1)).toISOString().slice(0, 10);
    const checkout = {
      id: null,
      borrowerFirstName: this.checkoutBookForm.value.fname,
      borrowerLastName: this.checkoutBookForm.value.lname,
      borrowedBook: this.book.id,
      checkedOutDate: todaysDate.toISOString().slice(0, 10),
      dueDate: tomorrowsDate,
    };
    this.book.status = 'BORROWED';
    this.book.dueDate = tomorrowsDate;
    this.checkoutService.saveCheckout(checkout);
    this.bookService.saveBook(this.book);
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'The book has been checked out. Due date is ' + tomorrowsDate + '.',
        buttonText: {ok: 'OK', cancel: 'noMessage'}
      }
    });
  }


}
