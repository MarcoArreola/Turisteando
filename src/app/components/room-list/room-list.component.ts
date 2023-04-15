import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {

  formRoom: FormGroup | undefined;
  rooms: Room[] | undefined;
  
  constructor(private addRoomService: AddRoomService, private router: Router){

  }

  ngOnInit(): void{
    this.addRoomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    })
  }

  joinRoom(room: Room): void{
    this.router.navigate(['/','room', room.id]);
  }
}
