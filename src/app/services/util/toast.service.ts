import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = []

  constructor() {
  }

  private show(options: { message: string, header: string, icon: string, clazz: string }) {
    this.toasts.push(options)
  }

  showError(message: string) {
    this.show({ message: message, header: 'Error', icon: 'error', clazz: 'text-danger' })
  }

  showSucess(message: string) {
    this.show({ message: message, header: 'Éxito', icon: 'check_circle', clazz: 'text-success' })
  }
}
