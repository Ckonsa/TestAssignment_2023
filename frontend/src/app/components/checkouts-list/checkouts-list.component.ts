import {Component, OnInit} from '@angular/core';
import {first, Observable} from 'rxjs';
import {Page} from '../../models/page';
import {CheckoutService} from '../../services/checkout.service';
import {Checkout} from '../../models/checkout';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss']
})
export class CheckoutsListComponent implements OnInit {

  checkouts$: Observable<Page<Checkout> | Error>;
  pageNumber$: number = Number(1); // The default page is number 1 aka the first page
  pagesTotal$: number;

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.checkoutService.getCheckouts({}));
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1});
    this.checkouts$.pipe(first(), ).subscribe(page => {if (!(page instanceof Error)) {this.pagesTotal$ = page.totalPages ; } });

  }
  previousPage(): void { // Function to move to the previous page
    this.pageNumber$ -= 1;
    if (this.pageNumber$ <= 0) {
      this.pageNumber$ = this.pagesTotal$;
    }
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  nextPage(): void { // Function to move to the next page
    this.pageNumber$ += 1;
    if (this.pageNumber$ > this.pagesTotal$) {
      this.pageNumber$ = 1;
    }
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  goToPage(): void {
    let goToPageNumber = Number((document.getElementById('goToPageNumber') as HTMLInputElement).value);
    if (goToPageNumber > this.pagesTotal$) {
      goToPageNumber = this.pagesTotal$;
    } else if (goToPageNumber < 1) {
      goToPageNumber = 1;
    }
    this.pageNumber$ = goToPageNumber;
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  lateCheckout(dueDate: string): boolean {
    const date: Date = new Date(dueDate);
    // const dateNow: Date = new Date(); // Using today's date results every checkout to be a late checkout
    const dateNow: Date = new Date('2020-10-05');
    return dateNow > date;
  }
}
