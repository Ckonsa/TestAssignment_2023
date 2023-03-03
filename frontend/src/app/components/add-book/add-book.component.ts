import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../services/book.service';
import {BookStatus} from '../../models/book-status';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent{
  constructor(
    private bookService: BookService,
  ) {
  }
  addBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  addBook(): void {
    const book = {
      id: null, // Should give a unique id to the book not null
      name: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      genre: this.addBookForm.value.genre,
      year: Number(this.addBookForm.value.year),
      added: new Date().toISOString().toString().slice(0, 10), // Takes today's date
      checkOutCount: 0,
      status: 'AVAILABLE' as BookStatus,
      dueDate: null,
      comment: null,
    };
    this.bookService.saveBook(book);
  }

}
