import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Player from 'src/app/Interfaces/player';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  roomid: string = this.activatedRoute.snapshot.params['id'];
  number: number[] = [0,0]
  @Input() room!: Room;
  @Input() mePlayer!: Player;
  player!: string;

  constructor(private activatedRoute: ActivatedRoute, 
              private addRoomService: AddRoomService, 
              private firestore: Firestore,
              private cookieService: CookieService,
              ){
    
  } 
  
  ngOnInit(){
    
  }

  async ngOnChanges(){
    if(this.room != undefined && this.mePlayer != undefined && this.room.started && this.room.players[this.room.turn].id != this.mePlayer.id){
      this.settingDice(this.room.dice);
    }
    if( this.room != undefined && this.mePlayer != undefined && this.room.started && this.room.players[this.room.turn].id == this.mePlayer.id && this.mePlayer.jail > 0){
      this.room.dice = [0,0]
      this.room.rolled = true;
      this.addRoomService.updatePlayer(this.mePlayer);
      this.addRoomService.updateRoom(this.room);
    }
  }

  settingDice(numbers: number[]){
    if(this.room.started){
      this.player = this.cookieService.get('playerId');
      if(this.room.players[this.room.turn].id != this.player && this.room.rolled && this.room.dice[0] != 0 && this.room.dice[1] != 0){ //Avoid double set on player who rolled dice
      const dice = [...document.querySelectorAll(".die-list")];
      this.toggleClasses(dice[0]);
      dice[0] = dice[0] as HTMLElement;
        if(dice[0] instanceof HTMLElement)
          dice[0].dataset['roll'] = numbers[0].toString();
      this.toggleClasses(dice[1]);
      dice[1] = dice[1] as HTMLElement;
      if(dice[1] instanceof HTMLElement)
        dice[1].dataset['roll'] = numbers[1].toString(); 
    }
  }
  }

  rollDice(){
    if(this.room.turn == -1 || this.room.players[this.room.turn].id != this.mePlayer.id || this.mePlayer.jail > 0 || this.room.rolled)
      return
    else{
    const dice = [...document.querySelectorAll(".die-list")];
    this.toggleClasses(dice[0]);
    dice[0] = dice[0] as HTMLElement;
    if( dice[0] instanceof HTMLElement){
      this.number[0] = this.getRandomNumber(1,6);
      dice[0].dataset['roll'] = this.number[0].toString();
    }
    this.toggleClasses(dice[1]);
    dice[1] = dice[1] as HTMLElement;
    if( dice[1] instanceof HTMLElement){
      this.number[1] = this.getRandomNumber(1,6);
      dice[1].dataset['roll'] = this.number[1].toString();
      if(this.number[0] == this.number[1])
        this.room.pairs += 1;
      else
        this.room.pairs = 0;
    }
    this.room.rolled = true
    this.room.dice[0] = this.number[0];
    this.room.dice[1] = this.number[1];
    this.addRoomService.updateRoom(this.room);
    }
  }

  toggleClasses(die: any) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");   
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
