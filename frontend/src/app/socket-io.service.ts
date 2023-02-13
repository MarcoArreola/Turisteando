import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SocketIoService extends Socket{
  
  outEven: EventEmitter<any> = new EventEmitter();

  constructor(cookieService: CookieService){
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          nameRoom: cookieService.get('room')
        }
      }
    })
    this.listen();
  }
  
  joinRoom(name: string, room: string) {
    this.ioSocket.emit('join', { name, room }, (error: string) => {
      try {
        if (error) {
          throw new Error(error);
        }
        console.log('Successfully joined the room');
      } catch (err) {
        console.error(err);
      }
    });
  }

  sendMessage(message: string){
    this.ioSocket.emit('sendMessage', message, (error: string) => {
      try {
        if (error) {
          throw new Error(error);
        }
    
        console.log(message);
      } catch (err) {
        console.error(err);
      }
    });
  }

  listen = () =>{
    this.ioSocket.on('message', (res: any) => this.outEven.emit(res));
    this.ioSocket.on('event', (res: any) => this.outEven.emit(res));
  }
  
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('event',payload);
  }
}