import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BASE_URL, WS_BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  constructor() {}
  connect(path: string) {
    const seperator = path.length > 0 && path[0] !== '/' ? '/' : '';
    const socket = io(`${WS_BASE_URL}${seperator}${path}`);
    return socket;
  }
}
