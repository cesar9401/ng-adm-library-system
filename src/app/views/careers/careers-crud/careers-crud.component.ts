import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmCareer } from 'src/app/data/adm.model';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmCareerService } from 'src/app/services/adm/adm-career.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-careers-crud',
  templateUrl: './careers-crud.component.html',
  styleUrls: ['./careers-crud.component.scss']
})
export class CareersCrudComponent implements OnInit {

  careerId!: number;
  career: AdmCareer;

  constructor(
    private careerService: AdmCareerService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.career = new AdmCareer();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.careerId = Number(params.get('id') ?? 0);
        if (!this.careerId) return;

        this.careerService.findById(this.careerId)
          .subscribe({
            next: career => this.career = career,
            error: (e: HttpErrorResponse) => {
              if (e.status == 404) {
                this.toastService.showError(MessageEnum.MSG_DEFAULT_404)
                void this.router.navigate(['/careers'])
                return;
              }

              this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
            }
          });
      }
    })
  }

  onSubmit() {
    if (!this.isValid) return this.toastService.showError(MessageEnum.MSG_INVALID_FORM);

    this.careerService.save(this.career)
      .subscribe({
        next: _ => {
          this.toastService.showSucess(MessageEnum.MSG_CHANGES_SAVED);
          void this.router.navigate(['/careers']);
        },
        error: (e: HttpErrorResponse) => {
          if (e.error == 'code_already_exists') return this.toastService.showError('El código que desea utilizar ya existe, verifique por favor.');
          this.toastService.showError(MessageEnum.MSG_ERROR_SERVER);
        }
      });
  }

  get isValid(): boolean {
    return !!this.career.code
      && !!this.career.name
      && !!this.career.code.trim()
      && !!this.career.name.trim();
  }
}
