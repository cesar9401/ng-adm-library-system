import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmBook } from 'src/app/data/adm.model';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmBookService } from 'src/app/services/adm/adm-book.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-books-crud',
  templateUrl: './books-crud.component.html',
  styleUrls: ['./books-crud.component.scss']
})
export class BooksCrudComponent implements OnInit {

  bookId!: number;
  book: AdmBook;

  constructor(
    private bookService: AdmBookService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.book = new AdmBook();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.bookId = Number(params.get('id') ?? 0);
        if (!this.bookId) return;

        this.bookService.findById(this.bookId)
          .subscribe({
            next: book => this.book = book,
            error: (e: HttpErrorResponse) => {
              if (e.status == 404) {
                this.toastService.showError(MessageEnum.MSG_DEFAULT_404)
                void this.router.navigate(['/books'])
                return;
              }
              this.toastService.showError(MessageEnum.MSG_ERROR_SERVER);
            }
          });
      }
    });
  }

  onSubmit() {
    if (!this.isValid) return this.toastService.showError(MessageEnum.MSG_INVALID_FORM);

    this.bookService.save(this.book)
      .subscribe({
        next: _ => {
          this.toastService.showSucess(MessageEnum.MSG_CHANGES_SAVED);
          void this.router.navigate(['/books']);
        },
        error: (e: HttpErrorResponse) => {
          if (e.error == 'isbn_already_exists') return this.toastService.showError('El ISBN que desea utilizar ya existe, verifique por favor.');
          this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
        }
      })
  }

  get isValid(): boolean {
    return !!this.book.isbn
      && !!this.book.title
      && !!this.book.author
      && !!this.book.publicationDate
      && !!this.book.editorial
      && this.book.stock != undefined
      && !isNaN(Number(this.book.stock))
      && !!this.book.isbn.trim()
      && !!this.book.author.trim()
      && !!this.book.editorial.trim();
  }
}
