import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmBook } from 'src/app/data/adm.model';
import { SimpleService } from 'src/app/services/simple-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmBookService extends SimpleService {

  private URL: string = environment.admBackend + '/books';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmBook[]>(this.URL, { observe: 'response', params: params });
  }

  findById(bookId: number) {
    return this.http.get<AdmBook>(`${this.URL}/${bookId}`);
  }

  save(book: AdmBook) {
    if (book.bookId) return this.http.put<AdmBook>(`${this.URL}/${book.bookId}`, book);
    return this.http.post<AdmBook>(this.URL, book);
  }
}
