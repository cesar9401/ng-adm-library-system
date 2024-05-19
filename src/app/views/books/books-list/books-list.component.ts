import { Component, OnInit } from '@angular/core';
import { AdmBook } from 'src/app/data/adm.model';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmBookService } from 'src/app/services/adm-book.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: AdmBook[] = [];

  constructor(
    private bookService: AdmBookService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.bookService.findAll().subscribe({
      next: response => {
        this.books = response.body ?? [];
        console.log(this.books);
        console.log(response.headers.get('X-Total-Count') ?? 0);
      },
      error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
    });
  }
}
