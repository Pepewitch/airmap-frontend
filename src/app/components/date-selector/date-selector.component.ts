import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AirmapService } from 'src/app/services/airmap.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  @Output() change = new EventEmitter<SelectedDate>();
  fromDate: Date;
  toDate: Date;
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {}

  handleFromChange(e) {
    this.fromDate = e.value;
    this.emitChange();
  }
  handleToChange(e) {
    this.toDate = e.value;
    this.emitChange();
  }
  emitChange() {
    const value = { from: this.fromDate, to: this.toDate };
    this.change.emit(value);
    this.airmapService.date.next(value);
  }
}

export interface SelectedDate {
  from: Date | undefined;
  to: Date | undefined;
}
