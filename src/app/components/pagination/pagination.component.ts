import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Output() pageChange = new EventEmitter<number>();
  @Input() page: number = 1;
  @Input() pageSize: number = 25;
  @Input() collectionSize: number = 0;
  @Input() currentListSize: number = 0;

  get message(): string {
    const offset = (this.page - 1) * this.pageSize;
    return `Mostrando ${offset + 1} - ${offset + this.currentListSize} de ${this.collectionSize} elementos`
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
