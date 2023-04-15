import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Player from 'src/app/Interfaces/player';
import { AddRoomService } from 'src/app/services/add-room.service';
import { gsap } from 'gsap';
import { ChangeDetectionStrategy } from '@angular/compiler';
import Room from 'src/app/Interfaces/room';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent{
  players: Player [] = [];
  playerTurn!: Player | any;
  roomid: string;
  room!: Room | any;

  @Input() Room!: Room;
  @Input() numbers!: number[]; 
  @Output() player = new EventEmitter<Player>();

  toX: number = 0;
  toY: number = 0;
  endTurn: boolean = false;

  @ViewChildren('box')
  box!: QueryList<ElementRef>
  boxTurn!: HTMLElement | any;

  constructor(private addRoomService: AddRoomService, private activatedRouter: ActivatedRoute){
    this.roomid = activatedRouter.snapshot.params['id']; 
    
    this.addRoomService.getPlayers().subscribe(players => {
      this.players = players.filter(player => player.room == this.roomid)
    })
  }

  async ngOnInit(){
    this.room = await this.addRoomService.getRoom(this.roomid);
    var elemento = document.getElementById('B1');
    if(elemento != null){
      this.toX = elemento.getBoundingClientRect().x
      this.toY = elemento.getBoundingClientRect().y
    }
  }

  ngOnChanges(){
    if(this.room != undefined){
      this.endTurn = this.room.rolled;
      this.avanzar(this.numbers)
    }
  }

  ngAfterViewChecked(): void{
    this.box.forEach((boxDiv: ElementRef<HTMLDivElement>)  => {
      this.players.forEach(player => {
        if(boxDiv.nativeElement.id == player.id){
          let position = document.getElementById('B'+player.position);
          if(position){
            this.toX = position.getBoundingClientRect().x;
            this.toY = position.getBoundingClientRect().y
            gsap.fromTo(boxDiv.nativeElement,{x: this.toX, y:this.toY}, {x: this.toX, y:this.toY, duration: 3})
          }
        }
      })
    })
  }

  avanzar(numeros: number[]){
    if(this.Room != undefined && this.players.length > 0 && this.Room.started && this.Room.rolled){
    this.playerTurn = this.players.filter(player => player.id == this.Room.players[this.Room.turn].id);
    if(this.playerTurn[0]){
      this.playerTurn[0].position += numeros[0] + numeros[1];
      if(this.playerTurn[0].position > 32){
        this.playerTurn[0].position -= 32;
        if(this.playerTurn[0].position > 1)
          this.playerTurn[0].money += 200
      }
      this.addRoomService.updatePlayer(this.playerTurn[0])
        console.log(this.playerTurn[0]); 
        this.emitPlayer(this.playerTurn[0]);
    }}
  }

  emitPlayer(player: Player){
    this.player.emit(player);
  }



}

