import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmUser } from 'src/app/data/adm.model';
import { SimpleService } from 'src/app/services/simple-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmUserService extends SimpleService {

  private URL: string = environment.admBackend + '/users';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmUser[]>(this.URL, { params: params, observe: 'response' });
  }

  findById(userId: number) {
    return this.http.get<AdmUser>(`${this.URL}/${userId}`);
  }

  save(user: AdmUser) {
    if (user.userId) return this.http.put<AdmUser>(`${this.URL}/${user.userId}`, user);
    return this.http.post<AdmUser>(this.URL, user);
  }
}
