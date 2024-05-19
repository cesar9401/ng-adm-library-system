import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmBook } from 'src/app/data/adm.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmBookService {

  private URL: string = environment.admBackend + '/books';

  constructor(private http: HttpClient) {
  }

  findAll() {
    return this.http.get<AdmBook[]>(this.URL, { observe: 'response' });
  }

  findById(bookId: number) {
    return this.http.get<AdmBook>(`${this.URL}/${bookId}`);
  }

  save(book: AdmBook) {
    if (book.bookId) return this.http.put<AdmBook>(`${this.URL}/${book.bookId}`, book);
    return this.http.post<AdmBook>(this.URL, book);
  }
}
