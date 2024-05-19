import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/util/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3 mt-2', 'style': 'z-index: 9999' }
})
export class ToastComponent {

  constructor(public toastService: ToastService) {
  }
}
