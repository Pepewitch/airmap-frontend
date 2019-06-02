import { Component, OnInit } from '@angular/core';
import { AirmapService } from 'src/app/services/airmap.service';
import { interval, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
