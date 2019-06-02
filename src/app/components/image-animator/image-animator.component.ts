import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { AirmapService } from 'src/app/services/airmap.service';
import { forkJoin, Observable, interval, Subject, of } from 'rxjs';
import { map, flatMap, delay } from 'rxjs/operators';
import { SpeedSelectorComponent } from './speed-selector/speed-selector.component';

@Component({
  selector: 'app-image-animator',
  templateUrl: './image-animator.component.html',
  styleUrls: ['./image-animator.component.scss']
})
export class ImageAnimatorComponent implements OnInit {
  @Input() height: number;
  @Input() images: Array<string> = [];
  @Input() initialIndex = 0;
  currentIndex = -1;
  buffer = 3;
  basePeriod = 1000;
  currentImage = '';
  nextImage = '';
  isPlaying = false;
  @ViewChild('current') currentEl: ElementRef<HTMLImageElement>;
  @ViewChild('next') nextEl: ElementRef<HTMLImageElement>;
  @ViewChild('speedSelector') speedSelectorEl: SpeedSelectorComponent;
  @Output() indexChange = new EventEmitter();
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {
    if (this.images.length > 0) {
      this.set(this.initialIndex).subscribe();
    }
  }

  get period() {
    return this.basePeriod / this.speedSelectorEl.speed;
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
    if (index < this.images.length) {
      this.currentIndex = index;
      this.indexChange.emit(index);
      const obs = [
        this.airmapService.getImage(this.images[index]).pipe(
          map(image => {
            this.currentImage = image;
          })
        )
      ];
      if (index + 1 < this.images.length) {
        obs.push(
          this.airmapService.getImage(this.images[index + 1]).pipe(
            map(image => {
              this.nextImage = image;
            })
          )
        );
      }
      return forkJoin(obs);
    }
    return of([]);
  }

  fade(time: number) {
    return new Observable(observer => {
      this.currentEl.nativeElement.style.transition = `opacity ease-in-out ${time}ms`;
      this.currentEl.nativeElement.style.opacity = '1';
      window.requestAnimationFrame(() => {
        this.currentEl.nativeElement.style.opacity = '0';
        setTimeout(() => {
          this.currentEl.nativeElement.style.transition = '';
          observer.next();
          observer.complete();
        }, time);
      });
    });
  }

  show() {
    return new Observable(observer => {
      requestAnimationFrame(() => {
        this.currentEl.nativeElement.style.transition = '';
        this.currentEl.nativeElement.style.opacity = '1';
        observer.next();
        observer.complete();
      });
    });
  }

  goNextFrame() {
    return this.fade(Math.floor(this.period / 2)).pipe(
      flatMap(() => this.set(this.currentIndex + 1)),
      flatMap(() => this.show()),
      flatMap(() => this.fetchBuffer())
    );
  }

  play() {
    this.goNextFrame()
      .pipe(delay(Math.abs(this.period / 2)))
      .subscribe(() => {
        if (this.currentIndex === this.images.length - 1) {
          this.isPlaying = false;
        }
        if (this.isPlaying) {
          this.play();
        }
      });
  }

  start() {
    if (this.currentIndex >= this.images.length - 1) {
      this.set(0).subscribe();
    }
    this.isPlaying = true;
    this.play();
  }

  stop() {
    this.isPlaying = false;
  }

  togglePlaying() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}
