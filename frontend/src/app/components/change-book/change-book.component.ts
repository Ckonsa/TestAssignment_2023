import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../services/book.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookStatus} from '../../models/book-status';
import {Observable} from 'rxjs';
import {Book} from '../../models/book';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.scss']
})
export class ChangeBookComponent implements OnInit{
  book$: Observable<Book | Error>;

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
  });
  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params.id))
      .pipe(switchMap(id => this.bookService.getBook(id)));
  }
  changeBook(): void {
    const book = {
      id: null,
      name: this.changeBookForm.value.title,
      author: this.changeBookForm.value.author,
      genre: this.changeBookForm.value.genre,
      year: Number(this.changeBookForm.value.year),
      added: new Date().toString().slice(0, 10),
      checkOutCount: 0,
      status: 'AVAILABLE' as BookStatus,
      dueDate: null,
      comment: null,
    };
    this.bookService.saveBook(book);
  }

}
