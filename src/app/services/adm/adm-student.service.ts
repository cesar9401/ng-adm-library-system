import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmStudent } from 'src/app/data/adm.model';
import { SimpleService } from 'src/app/services/simple-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmStudentService extends SimpleService {

  private URL: string = environment.admBackend + '/students';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmStudent[]>(this.URL, { params: params, observe: 'response' });
  }

  findById(studentId: number) {
    return this.http.get<AdmStudent>(`${this.URL}/${studentId}`);
  }

  save(student: AdmStudent) {
    if (student.studentId) return this.http.put<AdmStudent>(`${this.URL}/${student.studentId}`, student);
    return this.http.post<AdmStudent>(this.URL, student);
  }
}
