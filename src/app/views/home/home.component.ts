import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { WsService } from 'src/app/services/ws.service';
import { AirmapService } from 'src/app/services/airmap.service';
import { interval } from 'rxjs';
import { flatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: Array<string>;
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {
    const images = [];
    for (let i = 0; i < 30; i++) {
      images.push(`${i + 309}.png`);
    }
    this.images = images;
  }

  handleHeightChange(e) {
    console.log(e);
  }
  handleDateChange(e) {
    console.log(e);
  }
}