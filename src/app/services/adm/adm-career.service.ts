import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmCareer } from 'src/app/data/adm.model';
import { SimpleService } from 'src/app/services/simple-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmCareerService extends SimpleService {

  private URL: string = environment.admBackend + '/careers';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmCareer[]>(this.URL, { observe: 'response', params: params });
  }

  findById(careerId: number) {
    return this.http.get<AdmCareer>(`${this.URL}/${careerId}`);
  }

  save(career: AdmCareer) {
    if (career.careerId) return this.http.put<AdmCareer>(`${this.URL}/${career.careerId}`, career);
    return this.http.post<AdmCareer>(this.URL, career);
  }
}
