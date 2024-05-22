import { Component, OnInit } from '@angular/core';
import { AdmStudent } from 'src/app/data/adm.model';
import { SimpleList } from 'src/app/data/simple-list';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmStudentService } from 'src/app/services/adm/adm-student.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent extends SimpleList implements OnInit {

  students: AdmStudent[] = [];

  constructor(
    private studentService: AdmStudentService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.studentService.findAll(this.filters).subscribe({
      next: response => {
        this.students = response.body ?? [];
        this.collectionSize = Number(response.headers.get('X-Total-Count') ?? 0)
      },
      error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
    });
  }
}
