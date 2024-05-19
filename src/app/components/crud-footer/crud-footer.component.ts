import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-footer',
  templateUrl: './crud-footer.component.html',
  styleUrls: ['./crud-footer.component.scss']
})
export class CrudFooterComponent {

  constructor(private router: Router) {
  }


  @Input() cancelRoute!: any[];
  @Output() saveEvent = new EventEmitter()

  onSaveClick() {
    this.saveEvent.emit();
  }

  onCancelClick() {
    if (!this.cancelRoute) return;
    void this.router.navigate(this.cancelRoute);
  }
}
