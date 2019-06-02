import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AirmapService } from 'src/app/services/airmap.service';

@Component({
  selector: 'app-height-selector',
  templateUrl: './height-selector.component.html',
  styleUrls: ['./height-selector.component.scss']
})
export class HeightSelectorComponent implements OnInit {
  @Input() min = 10;
  @Input() max = 400;
  @Input() step = 10;
  @Output() change = new EventEmitter();
  buttonList = [];
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {
    for (let i = this.min; i <= this.max; i += this.step) {
      this.buttonList.push({ value: i, selected: false });
    }
  }
  toggle(btn) {
    btn.selected = !btn.selected;
    const value = this.getSelected();
    this.change.emit(value);
    this.airmapService.height.next(value);
  }
  getSelected() {
    return this.buttonList.filter(btn => btn.selected).map(btn => btn.value);
  }
}
