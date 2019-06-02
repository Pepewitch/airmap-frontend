import { Injectable, OnInit } from '@angular/core';
import { WsService } from './ws.service';
import { of, Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { SelectedDate } from '../components/date-selector/date-selector.component';

@Injectable({
  providedIn: 'root'
})
export class AirmapService {
  private socket: SocketIOClient.Socket;
  private imageCache = {};
  private indexCache = {};
  private selectedDate = new BehaviorSubject<SelectedDate>({
    from: undefined,
    to: undefined
  });
  private selectedHeight = new BehaviorSubject<number[]>([]);
  constructor(private wsService: WsService) {
    this.socket = this.wsService.connect('/airmap');
  }
  getImage(id: string): Observable<string> {
    if (id in this.imageCache) {
      return of(this.imageCache[id]);
    } else {
      return new Observable(observer => {
        this.socket.emit('image', id, image => {
          this.imageCache[id] = `data:image/png;base64,${image}`;
          observer.next(this.imageCache[id]);
          observer.complete();
        });
      });
    }
  }
  getImageIds(date: SelectedDate): Observable<ImageId> {
    return new Observable(observer => {
      this.socket.emit(
        'id',
        { from: date.from.toISOString(), to: date.to.toISOString() },
        (id: ImageId) => {
          observer.next(id);
          observer.complete();
        }
      );
    });
  }
  getCurrentFrame(value) {
    return (
      this.indexCache[
        `${this.date.value.from.valueOf()},${this.date.value.to.valueOf()},${value}`
      ] || 0
    );
  }
  updateCurrentFrame(value, index) {
    this.indexCache[
      `${this.date.value.from.valueOf()},${this.date.value.to.valueOf()},${value}`
    ] = index;
  }
  get date() {
    return this.selectedDate;
  }
  set date(value) {
    this.selectedDate = value;
  }
  get height() {
    return this.selectedHeight;
  }
  set height(value) {
    this.selectedHeight = value;
  }
}

export interface ImageId {
  [height: number]: string[];
}
