import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutsListComponent } from './components/checkouts-list/checkouts-list.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangeBookComponent } from './components/change-book/change-book.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutsListComponent,
    CheckoutDetailComponent,
    AddBookComponent,
    ChangeBookComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
