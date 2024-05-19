import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-single-date-picker',
  templateUrl: './single-date-picker.component.html',
  styleUrls: ['./single-date-picker.component.scss']
})
export class SingleDatePickerComponent {

  @Input() label: string = '';
  @Input() required: boolean = true;

  @Output() dateChange = new EventEmitter<string>();

  @Input() set date(_date: string) {
    if (!_date) return;
    this._date = _date;

    const date = moment(this._date);
    if (!date.isValid()) return;

    this.model = new NgbDate(date.year(), date.month() + 1, date.date());
  }

  _date!: string;
  model!: NgbDateStruct;

  constructor(private calendar: NgbCalendar) {
  }

  onModelChange(model: NgbDateStruct) {
    console.log(model);
    const isValid = this.calendar.isValid(NgbDate.from(model));
    if (!isValid) {
      this.dateChange.emit('');
      return;
    }

    const tmpDate = new Date();
    tmpDate.setFullYear(model.year, model.month - 1, model.day);
    tmpDate.setHours(0, 0, 0, 0)
    const date = moment(tmpDate).format('yyyy-MM-DD');
    this.dateChange.emit(date);
  }
}
