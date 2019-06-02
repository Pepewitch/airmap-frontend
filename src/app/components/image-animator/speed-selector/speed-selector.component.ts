import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speed-selector',
  templateUrl: './speed-selector.component.html',
  styleUrls: ['./speed-selector.component.scss']
})
export class SpeedSelectorComponent implements OnInit {
  buttonList = [{ value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2 }];
  private selectedSpeed = 1;
  @Output() change = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  select(btn) {
    this.selectedSpeed = btn.value;
    this.change.emit(this.selectedSpeed);
  }
  get speed() {
    return this.selectedSpeed;
  }
}
