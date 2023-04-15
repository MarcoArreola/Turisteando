import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Peon } from 'src/app/Interfaces/peon';
import Player from 'src/app/Interfaces/player';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';

declare var window: any;

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css'],
})
export class JoinRoomComponent implements OnInit {
  
  peonList: Peon[] = [];
  formModal: any;
  player: Player;
  @Output() emitPlayer = new EventEmitter<Player>();
  players: Player [] = [];
  @Input() room: Room | any;
  roomid: string = this.router.snapshot.params['id'];
  @Input() Modal: boolean = false;
  

  constructor(private router: ActivatedRoute, 
              private addRoomService: AddRoomService, 
              private cookieService: CookieService
              ){
    this.player = {
      id: "",
      room: this.roomid,
      name: "",
      color: "",
      img: "",
      position: 1,
      money: 0,
      turn: false,
      jail: 0,
      bankrupt: false,
      pairs: 0,
      propieties: 0,
      ports: 0,
    }
  }
  

  async ngOnInit() {
    this.room = await this.addRoomService.getRoom(this.roomid);
    this.player.money = this.room.money
    this.peonList = this.getPeones();
    //this.showModal();
    if(this.Modal == false){
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      this.showModal();
    }
    this.addRoomService.getPlayers().subscribe(players => {
      this.players = players;
    })
    console.log(this.players);
  }

  ngOnChanges(){
    if(this.Modal == false && this.cookieService.get('playerId') == null){
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("staticBackdrop")
      );
      this.showModal();
    }
  }

  getPeones(): Peon[]{
    const peonList: Peon[] = [
      {id: "1", color: "#E7C8F8",  image: '../assets/FICHAS/1.png',available: true},
      {id: "2", color: "#5829D7", image: '../assets/FICHAS/2.png',available: true},
      {id: "3", color: "#D79D29", image:'../assets/FICHAS/3.png', available: true},
      {id: "4", color: "#FF9BEE", image:'../assets/FICHAS/4.png', available: true},
      {id: "5", color: "#68452D", image:'../assets/FICHAS/5.png', available: true},
      {id: "6", color: "#AEAE56", image:'../assets/FICHAS/6.png', available: true},
      {id: "7", color: "#F11818", image:'../assets/FICHAS/7.png', available: true},
      {id: "8", color: "#259D35", image:'../assets/FICHAS/8.png', available: true},
      {id: "9", color: "#9FF2FF", image:'../assets/FICHAS/9.png', available: true},
      {id: "10", color: "#D3DCE1", image:'../assets/FICHAS/10.png',available: true}
    ];
    return peonList;
  }

  showModal(){
    this.formModal.show();
  }

  async addPlayer(){
    this.formModal.hide();
    this.player.id = (await this.addRoomService.addPlayer(this.player)).id;
    this.emitPlayer.emit(this.player);
    this.addRoomService.updatePlayerId(this.player);
    this.cookieService.set('playerId', this.player.id);
    if(this.room.owner == ""){
      this.room.owner = this.player.id;
    }
    this.room.players.push({id: this.player.id});
    this.room.playersNum += 1;
    this.addRoomService.updateRoom(this.room);
  }

  selectPeon(imgId: string, color: string){
    this.player.img = imgId;
    this.player.color = color;
  }
}
