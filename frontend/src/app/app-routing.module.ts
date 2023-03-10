import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import {CheckoutsListComponent} from './components/checkouts-list/checkouts-list.component';
import {CheckoutDetailComponent} from './components/checkout-detail/checkout-detail.component';
import {AddBookComponent} from './components/add-book/add-book.component';
import {ChangeBookComponent} from './components/change-book/change-book.component';
import {CheckoutBookComponent} from './components/checkout-book/checkout-book.component';
import {ChangeCheckoutComponent} from './components/change-checkout/change-checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'addBook', component: AddBookComponent},
  {path: 'changeBook/:id', component: ChangeBookComponent},
  {path: 'checkoutBook/:id', component: CheckoutBookComponent},
  {path: 'checkouts', component: CheckoutsListComponent},
  {path: 'checkouts/:id', component: CheckoutDetailComponent},
  {path: 'changeCheckout/:id', component: ChangeCheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
