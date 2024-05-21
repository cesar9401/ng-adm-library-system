import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmCareer, AdmStudent } from 'src/app/data/adm.model';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmCareerService } from 'src/app/services/adm/adm-career.service';
import { AdmStudentService } from 'src/app/services/adm/adm-student.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-students-crud',
  templateUrl: './students-crud.component.html',
  styleUrls: ['./students-crud.component.scss']
})
export class StudentsCrudComponent implements OnInit {

  showPass0: boolean = false;
  showPass1: boolean = false;
  password1: string | undefined = undefined;

  studentId!: number;
  student: AdmStudent;
  careers: AdmCareer[] = [];

  constructor(
    private studentService: AdmStudentService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private careerService: AdmCareerService
  ) {
    this.student = new AdmStudent();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.studentId = Number(params.get('id') ?? 0);
        if (!this.studentId) return;

        this.studentService.findById(this.studentId)
          .subscribe({
            next: student => this.student = student,
            error: (e: HttpErrorResponse) => {
              if (e.status == 404) {
                this.toastService.showError(MessageEnum.MSG_DEFAULT_404);
                void this.router.navigate(['/students']);
                return;
              }
              this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
            }
          })
      }
    });

    this.careerService.findAll().subscribe({
      next: (response) => {
        this.careers = response.body ?? [];
      },
      error: _ => this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
    })
  }

  onSubmit() {
    if (!this.isValid) return this.toastService.showError(MessageEnum.MSG_INVALID_FORM);
    if (!this.studentId && this.student.user.password !== this.password1) return this.toastService.showError('Las contraseñas no coinciden, por favor verifique')

    this.studentService.save(this.student)
      .subscribe({
        next: _ => {
          this.toastService.showSucess(MessageEnum.MSG_CHANGES_SAVED);
          void this.router.navigate(['/students']);
        },
        error: (e: HttpErrorResponse) => {
          if (e.error == 'carnet_already_exists') return this.toastService.showError('El carnet ya esta registrado, por favor verifique')
          if (e.error == 'email_already_exists') return this.toastService.showError('El carnet ya esta registrado, por favor verifique')

          this.toastService.showError(MessageEnum.MSG_ERROR_SERVER);
        }
      });
  }

  get isValid() {
    const user = this.student.user;

    return !!(
      this.student.career
      && this.student.carnet
      && this.student.birthday
      && user.email
      && user.fullName
      && (this.studentId || user.password)
      && (this.studentId || this.password1)
      && this.student.carnet.trim()
      && user.email.trim()
      && user.fullName.trim()
    );
  }

  compareWith = (item: AdmCareer, selected: AdmCareer) => {
    return item.careerId === selected.careerId;
  }
}
