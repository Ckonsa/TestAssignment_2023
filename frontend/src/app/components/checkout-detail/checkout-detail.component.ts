import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Checkout} from '../../models/checkout';
import {CheckoutService} from '../../services/checkout.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckoutDetailComponent implements OnInit{
  checkout$: Observable<Checkout | Error>;
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private bookService: BookService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.checkout$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.checkoutService.getCheckout(id)));
  }
  openDialog(title: string, checkoutId: string): void {
    // Got the code and idea from here: https://www.javachinna.com/angular-confirmation-dialog/
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Do you want to return a book called "' + title + '"?',
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.checkoutService.deleteCheckout(checkoutId);
      }
    });
  // Book's status and due date should be changed
  }

}
