import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmUser } from 'src/app/data/adm.model';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmUserService } from 'src/app/services/adm/adm-user.service';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.scss']
})
export class UsersCrudComponent implements OnInit {

  userId!: number;
  user: AdmUser;

  password1: string | undefined = undefined;
  showPass0: boolean = false;
  showPass1: boolean = false;

  constructor(
    private userService: AdmUserService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = new AdmUser();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.userId = Number(params.get('id') ?? 0);
        if (!this.userId) return;

        this.userService.findById(this.userId)
          .subscribe({
            next: user => this.user = user,
            error: (e: HttpErrorResponse) => {
              if (e.status == 404) {
                this.toastService.showError(MessageEnum.MSG_DEFAULT_404);
                void this.router.navigate(['/users']);
                return;
              }
              this.toastService.showError(MessageEnum.MSG_ERROR_SERVER);
            }
          })
      }
    })
  }

  onSubmit() {
    if (!this.isValid) return this.toastService.showError(MessageEnum.MSG_INVALID_FORM);
    if (!this.userId && this.user.password !== this.password1) return this.toastService.showError('Las contraseñas no coinciden, por favor verifique');

    this.userService.save(this.user)
      .subscribe({
        next: _ => {
          this.toastService.showSucess(MessageEnum.MSG_CHANGES_SAVED);
          void this.router.navigate(['/users']);
        },
        error: (e: HttpErrorResponse) => {
          if (e.error == 'email_already_exists') return this.toastService.showError('El correo electronico ya esta registrado, intente con uno nuevo')
          this.toastService.showError(MessageEnum.MSG_ERROR_SERVER)
        }
      })
  }

  get isValid(): boolean {
    return !!this.user.email
      && !!this.user.fullName
      && !!(this.userId || this.user.password)
      && !!(this.userId || this.password1)
      && !!this.user.email.trim()
      && !!this.user.fullName.trim()
      && !!(this.userId || this.user.password.trim())
      && !!(this.userId || (this.password1 && this.password1.trim()))
  }
}
