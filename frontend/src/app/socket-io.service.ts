import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SocketIoService extends Socket{
  constructor(cookieService: CookieService){
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          nameRoom: cookieService.get('room')
        }
      }
    })
    
  }
  
  joinRoom(room: string) {
    this.ioSocket.emit('join', room);
    //this.ioSocket.on('event', (data: any) => {
    //  console.log(data);
    //});
  }
    
}