import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoService } from 'src/app/socket-io.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  room:any
  id:string = '0';
  constructor(private router: ActivatedRoute,
              private cookieService: CookieService,
              private socketIoService: SocketIoService){ }

  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('room');
    this.cookieService.set('room', this.room);
    this.socketIoService.joinRoom("Marco", this.room);
  }
}
