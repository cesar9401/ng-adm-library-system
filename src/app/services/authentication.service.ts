import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthReqDto, JwtResDto } from 'src/app/data/adm.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL: string = environment.admBackend + '/auth';

  constructor(private http: HttpClient) {
  }

  doLogin(authReq: AuthReqDto): Observable<JwtResDto> {
    return this.http.post<JwtResDto>(this.URL, authReq);
  }
}
