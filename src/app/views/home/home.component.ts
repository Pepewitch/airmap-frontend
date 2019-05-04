import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  message: string;
  constructor(public http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(`${BASE_URL}/airmap`, { responseType: "text" })
      .subscribe(message => {
        console.log(message);
      });
  }
}
