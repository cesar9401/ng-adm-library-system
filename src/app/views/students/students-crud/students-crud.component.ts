import { Component } from '@angular/core';
import { AdmStudent } from 'src/app/data/adm.model';

@Component({
  selector: 'app-students-crud',
  templateUrl: './students-crud.component.html',
  styleUrls: ['./students-crud.component.scss']
})
export class StudentsCrudComponent {

  showPass0: boolean = false;
  showPass1: boolean = false;
  password1: string | undefined = undefined;

  studentId!: number;
  student: AdmStudent;

  constructor() {
    this.student = new AdmStudent();
  }

  onSubmit() {

  }

  get isValid() {
    return false;
  }
}
