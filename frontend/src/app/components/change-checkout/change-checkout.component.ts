import {Component, OnInit} from '@angular/core';
import {first, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, switchMap} from 'rxjs/operators';
import {Checkout} from '../../models/checkout';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-change-checkout',
  templateUrl: './change-checkout.component.html',
  styleUrls: ['./change-checkout.component.scss']
})
export class ChangeCheckoutComponent implements OnInit{

  checkout$: Observable<Checkout | Error>;
  checkout: Checkout;

  constructor(
    private route: ActivatedRoute,
    private  checkoutService: CheckoutService,
  ) {
  }
  changeCheckoutForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.checkout$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.checkoutService.getCheckout(id)));
    this.checkout$.pipe(first(), ).subscribe(checkout => {if (!(checkout instanceof Error)) {this.checkout = checkout ; }});
  }
  changeCheckout(): void {
    const checkout = {
      id: this.checkout.id,
      borrowerFirstName: this.changeCheckoutForm.value.fname,
      borrowerLastName: this.changeCheckoutForm.value.lname,
      dueDate: this.changeCheckoutForm.value.dueDate,
      borrowedBook: this.checkout.borrowedBook,
      checkedOutDate: this.checkout.checkedOutDate
    };
    // If due date is changed then it should also be changed for the borrowed book
    this.checkoutService.saveCheckout(checkout);
  }


}
