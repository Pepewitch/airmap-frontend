import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirmapService, ImageId } from 'src/app/services/airmap.service';
import { Observable, Subject, merge, of } from 'rxjs';
import { SelectedDate } from '../date-selector/date-selector.component';
import { takeUntil, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-animator-list',
  templateUrl: './animator-list.component.html',
  styleUrls: ['./animator-list.component.scss']
})
export class AnimatorListComponent implements OnInit, OnDestroy {
  selectedDate: SelectedDate;
  selectedHeight: number[] = [];
  imageIds: ImageId;
  unsubscribe = new Subject();
  animatorImages: AnimatorImage[] = [];
  constructor(private airmapService: AirmapService) {}

  ngOnInit() {
    merge(
      this.airmapService.height.pipe(
        map(height => (this.selectedHeight = height))
      ),
      this.airmapService.date.pipe(
        map(date => (this.selectedDate = date)),
        flatMap(() =>
          this.selectedDate.from && this.selectedDate.to
            ? this.airmapService.getImageIds(this.selectedDate)
            : of({})
        ),
        map(ids => (this.imageIds = ids))
      )
    )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => (this.animatorImages = this.getAnimatorImages()));
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  getAnimatorImages(): AnimatorImage[] {
    if (
      this.imageIds &&
      this.selectedDate &&
      this.selectedDate.from &&
      this.selectedDate.to &&
      this.selectedHeight
    ) {
      return this.selectedHeight.map(height => ({
        height,
        images: this.imageIds[height],
        currentIndex: this.airmapService.getCurrentFrame(height)
      }));
    }
    return [];
  }
  updateIndex(animatorImage, index) {
    this.airmapService.updateCurrentFrame(animatorImage.height, index);
  }
}

export interface AnimatorImage {
  height: number;
  images: string[];
}
