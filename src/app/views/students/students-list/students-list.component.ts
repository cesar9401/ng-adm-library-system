import { Component, OnInit } from '@angular/core';
import { SimpleList } from 'src/app/data/simple-list';
import { AdmStudentService } from 'src/app/services/adm/adm-student.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent extends SimpleList implements OnInit {

  constructor(
    private studentService: AdmStudentService,
    private toastService: ToastService
  ) {
    super();
  }

  findAll(): void {
  }

  ngOnInit(): void {
  }
}
