import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Player from 'src/app/Interfaces/player';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  room:any
  id:string = '0';
  roomParams: Room | any;
  players: Player[] = [];

  constructor(private router: ActivatedRoute,
              private cookieService: CookieService,
              private addRoomService: AddRoomService){ }

  ngOnInit(): void{
    this.room = this.router.snapshot.paramMap.get('id');
    this.cookieService.set('roomId', this.room);
    this.getRoomParams(this.room);  
  }

  async getRoomParams(roomId: string){
    this.roomParams = await this.addRoomService.getRoom(this.room);
    console.log(this.roomParams);
    this.roomParams.players.forEach((player: Player) => {
      this.players.push(player);
    });
    console.log(this.players);
  }

}
