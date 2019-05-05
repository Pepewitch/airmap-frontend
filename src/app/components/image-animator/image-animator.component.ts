import { Component, OnInit, Input } from "@angular/core";
import { AirmapService } from "src/app/services/airmap.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-image-animator",
  templateUrl: "./image-animator.component.html",
  styleUrls: ["./image-animator.component.scss"]
})
export class ImageAnimatorComponent implements OnInit {
  @Input() images: Array<string>;
  @Input() buffer = 3;
  currentIndex = -1;
  currentImage: string;
  nextImage: string;
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {
    if (this.images.length > 0) {
      this.set(0).subscribe();
    }
  }

  fetchBuffer() {
    const fetching = [];
    for (let i = 0; i < this.buffer; i++) {
      if (this.currentIndex + i < this.images.length) {
        const bufferId = this.images[this.currentIndex + i];
        fetching.push(this.airmapService.getImage(bufferId));
      } else {
        break;
      }
    }
    return forkJoin(fetching);
  }

  set(index) {
    this.currentIndex = index;
    return this.fetchBuffer().pipe(
      map(() => {
        this.airmapService.getImage(this.images[index]).subscribe(image => {
          this.currentImage = image;
        });
        this.airmapService.getImage(this.images[index + 1]).subscribe(image => {
          this.nextImage = image;
        });
      })
    );
  }
}
