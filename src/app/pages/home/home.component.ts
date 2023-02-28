import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Room from 'src/app/Interfaces/room';
import Player from 'src/app/Interfaces/player';
import { AddRoomService } from 'src/app/services/add-room.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formRoom: FormGroup;
  rooms: Room[] | undefined;

  constructor(
    private addRoomService: AddRoomService,
    private router: Router
  ){

    this.formRoom = new FormGroup({
      name: new FormControl(),
      password: new FormControl(),
      money: new FormControl(),
      owner: new FormControl(),
      private: new FormControl(),
      playersNum: new FormControl(),
      players : new FormControl(),
      dice: new FormControl(), 
    });

    

  }

  ngOnInit(): void{
    this.addRoomService.getRooms().subscribe(rooms => {
      console.log(rooms);
      this.rooms = rooms;
    })
  }

  async onSubmit(){
    const response = await this.addRoomService.addRoom(this.formRoom.value);
    //await this.router.navigate(['/','room',response.id]);
    let room: Room | any = await this.addRoomService.getRoom(response.id);
    room.id = response.id;
    console.log(room);
    this.joinRoom(room);
  }

  async joinRoom(room: Room){
    await this.router.navigate(['/','room',room.id]);
    room.playersNum += 1;
    room.players.push({
      id: '1',
      name: "Marco",
      money: "5",
      turn: false,
      propieties: []
    });
    this.addRoomService.updateRoom(room);
  }

  async updateRoom(room: Room){
    room.owner = "Marco";
    room.playersNum += 1;
    this.addRoomService.updateRoom(room);
  }
}
