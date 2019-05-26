import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  @Output() change = new EventEmitter();
  fromDate: Date;
  toDate: Date;
  constructor() {}

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
    this.change.emit({ from: this.fromDate, to: this.toDate });
  }
}
