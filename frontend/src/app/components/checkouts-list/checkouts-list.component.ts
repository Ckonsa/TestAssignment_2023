import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.checkoutService.getCheckouts({}));
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Page numbers go from 0...49

  }
  previousPage(): void { // Function to move to the previous page
    this.pageNumber$ -= 1;
    if (this.pageNumber$ <= 0) {
      this.pageNumber$ = 50; // This should be a variable, so if there would be less or more pages it would still work
    }
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }
  nextPage(): void { // Function to move to the next page
    this.pageNumber$ += 1;
    if (this.pageNumber$ > 50) {
      this.pageNumber$ = 1;
    }
    this.checkouts$ = this.checkoutService.getCheckouts({pageIndex: this.pageNumber$ - 1}); // Updates shown page
  }

}
