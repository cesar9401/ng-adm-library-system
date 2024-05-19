import { Component, OnInit } from '@angular/core';
import { AdmBook } from 'src/app/data/adm.model';
import { SimpleList } from 'src/app/data/simple-list';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmBookService } from 'src/app/services/adm/adm-book.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent extends SimpleList implements OnInit {

  books: AdmBook[] = [];

  constructor(
    private bookService: AdmBookService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.bookService.findAll(this.filters).subscribe({
      next: response => {
        this.books = response.body ?? [];
        this.collectionSize = Number(response.headers.get('X-Total-Count') ?? 0);
      },
      error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
    });
  }
}
