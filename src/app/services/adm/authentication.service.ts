import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthReqDto, JwtResDto } from 'src/app/data/adm.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL: string = environment.admBackend + '/auth';

  constructor(private http: HttpClient) {
  }

  doLogin(authReq: AuthReqDto): Observable<JwtResDto> {
    return this.http.post<JwtResDto>(this.URL, authReq)
      .pipe(
        tap(res => this.saveToken(res.token))
      );
  }

  private saveToken(token: string) {
    if (token.startsWith('Bearer ')) token = token.substring('Bearer '.length);
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }
}
