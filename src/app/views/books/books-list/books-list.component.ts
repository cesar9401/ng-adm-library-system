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

  page: number = 1;
  pageSize: number = 25;
  collectionSize: number = 0;
  filters!: Map<string, string>;

  constructor(
    private bookService: AdmBookService,
    private toastService: ToastService
  ) {
    this.filters = new Map<string, string>();
    this.filters
      .set('page', `${this.page}`)
      .set('size', `${this.pageSize}`)
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

  onPageChange(page: number) {
    this.filters.set('page', `${page}`)
    this.findAll();
  }
}
