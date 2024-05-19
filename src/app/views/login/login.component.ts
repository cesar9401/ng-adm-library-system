import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthReqDto } from 'src/app/data/adm.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPass = false;
  authReq: AuthReqDto;

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.authReq = new AuthReqDto();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.isValid) return this.toastService.showError('Ingrese sus credenciales para continuar')
    this.authenticationService.doLogin(this.authReq).subscribe({
      next: _ => {
        void this.router.navigate(['/home'])
        this.toastService.showSucess('Inicio de sesión exitoso');
      },
      error: _ => this.toastService.showError('Credenciales invalidas')
    })
  }

  get isValid() {
    return this.authReq.username
      && this.authReq.password
      && this.authReq.username.trim()
      && this.authReq.password.trim()
  }
}
