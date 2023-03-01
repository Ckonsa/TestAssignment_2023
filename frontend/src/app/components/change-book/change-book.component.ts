import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookStatus} from '../../models/book-status';
import {first, Observable} from 'rxjs';
import {Book} from '../../models/book';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.scss']
})
export class ChangeBookComponent implements OnInit{
  book$: Observable<Book | Error>;
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }
  changeBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.bookService.getBook(id)));
    this.book$.pipe(first(), ).subscribe(book => {if (!(book instanceof Error)) {this.book = book ; }});
  }
  changeBook(): void {
    const book = {
      id: this.book.id,
      name: this.changeBookForm.value.title,
      author: this.changeBookForm.value.author,
      genre: this.changeBookForm.value.genre,
      year: Number(this.changeBookForm.value.year),
      added: this.book.added,
      checkOutCount: this.book.checkOutCount,
      status: this.changeBookForm.value.status as BookStatus,
      dueDate: this.book.dueDate,
      comment: this.changeBookForm.value.comment,
    };
    this.bookService.saveBook(book);
  }

}
