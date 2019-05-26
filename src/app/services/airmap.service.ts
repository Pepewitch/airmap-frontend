import { Injectable, OnInit } from '@angular/core';
import { WsService } from './ws.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirmapService {
  socket: SocketIOClient.Socket;
  imageCache = {};
  constructor(private wsService: WsService) {
    this.socket = this.wsService.connect('/airmap');
  }
  getImage(id: string) {
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
}
