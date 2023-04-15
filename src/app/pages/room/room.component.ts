import { Component, Input, OnInit } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Player from 'src/app/Interfaces/player';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  
  // Room info
  room:any
  roomParams: Room | any;
  numbers!: number[];
  started: boolean = false;
 
  //Players
  players: Player[] = [];
  playerTurn!: Player | any;
  mePlayer!: Player;

  bought: boolean = false;
  owner: boolean = false;
  pairs: number = 0;
  end: boolean = true;
  propertyOwner!: Player[] | any;
  
  // Propieties
  blocks: any[] = [];
  block: any;
  
  //Info and airplane
  selected: boolean = false;
  avion: boolean = false;
  imgId:string = '0';

  // Propieties
  available: boolean = false;
  upgrade: boolean = false;
  decrease: boolean = false;
  sell: boolean = false;
  pay: boolean = false;
  jail: boolean = false;
  freeUpgrade: boolean = false;

  constructor(private router: ActivatedRoute,
              protected cookieService: CookieService,
              private addRoomService: AddRoomService,
              private firestore: Firestore
             ){ }

  async ngOnInit(){
    this.room = this.router.snapshot.paramMap.get('id');

    this.roomParams = await this.addRoomService.getRoom(this.room);
    if(await this.roomParams.started)
      this.playerTurn = await this.addRoomService.getPlayer(this.roomParams.players[this.roomParams.turn].id);
    if(this.cookieService.get('playerId') != undefined)
      this.mePlayer = await this.addRoomService.getPlayer(this.cookieService.get('playerId')) as Player;

    this.roomParams = this.updateRoom(this.room);

    this.addRoomService.getBlocks(this.room).subscribe(blocks => {
      this.blocks = blocks;
    })  

    this.addRoomService.getPlayers().subscribe(players => {
      this.players = players.filter(player => player.room = this.room);
    })
  }

  async startGame(){
    if(this.roomParams.playersNum > 1)
      if(this.roomParams.owner == this.cookieService.get('playerId')){
        this.roomParams.started = true;
        this.roomParams.turn += 1;
        this.addRoomService.updateRoom(this.roomParams);
        this.playerTurn = await this.addRoomService.getPlayer(this.roomParams.players[this.roomParams.turn].id);
      }
      else
        console.log("Solo el dueño de la sala puede iniciar la partida")
    else
      console.log("Cantidad de jugadores insuficiente")
  }
  
  endTurn(){
    if(this.cookieService.get('playerId') == this.playerTurn.id){
      if(this.pay || this.jail)
        console.log("No puedes terminar turno sin finalizar pendientes.")
      else{
        if(this.mePlayer.jail > 0){
          this.mePlayer.jail -= 1;
          this.addRoomService.updatePlayer(this.mePlayer)
        }
        if( (this.roomParams.turn + 1) >= this.roomParams.players.length )
          this.roomParams.turn = 0;
        else
          this.roomParams.turn += 1; 
        
        this.roomParams.pairs = 0;
        this.roomParams.dice = this.roomParams.dice;   
        this.roomParams.rolled = false;
        this.available = this.upgrade = this.freeUpgrade = this.decrease = this.sell = this.jail = this.pay = false;
        this.pairs = 0;
        this.bought = false;
        this.addRoomService.updateRoom(this.roomParams)
      }
    }
    else{
      console.log("Solo el jugador actual puede terminar su turno.")
    }
  }

  rolledPairs(){
    if(this.roomParams.pairs > 0 && this.roomParams.pairs < 3){
      this.roomParams.rolled = false;
      this.addRoomService.updateRoom(this.roomParams);
    }
    else if(this.roomParams.pairs == 3)
      this.Jail();
    else 
      this.end = true;
    
    
  }

  actions(player: Player){
    this.playerTurn = player;
    if(player.id == this.cookieService.get('playerId') && player.jail == 0){
      this.block = this.blocks.filter(block => block.id == player.position);
      this.block = this.block[0];
      this.PositionBlock("S"+this.block.id)    
      if(this.block.id == 1)
        this.Sail();
      else if(this.block.id == 6 || this.block.id == 12 || this.block.id == 22)
        console.log("Fortuna");
      else if(this.block.id == 9 && this.playerTurn.jail == 0)  
        this.jail = true;
      else if(this.block.id == 17)
        this.Carnival();
      else if(this.block.id == 25)
        this.avion = true;
      else if(this.block.id == 31)
        this.Tax();
      else
        this.Propieties(player)
      //this.rolledPairs()
    }
        
  }

  Propieties(player: Player){
    if(this.block.owner === ""){
      if(player.money >= this.block.levelParams[0].price)
        this.available = true;
    }
    else if(this.block.owner != player.id)
      this.pay = true;
    else{
      if(this.block.class != "Puerto" && this.block.currentLevel < 3 && player.money >= this.block.levelParams[this.block.currentLevel].price )
        this.upgrade = true;
      if(this.block.class != "Puerto" && this.block.currentLevel > 0)
        this.decrease = true;
      this.sell = true;
    }
  }


  Sail(){
    this.playerTurn.money += 300;
    this.addRoomService.updatePlayer(this.playerTurn);
  }

  Tax(){
    this.playerTurn.money -= 300;
    this.addRoomService.updatePlayer(this.playerTurn);
  }

  Jail(){
    this.playerTurn.jail = 3;
    this.jail = false;
    this.addRoomService.updatePlayer(this.playerTurn);
  }

  Carnival(){
    this.freeUpgrade = true;
  }

  PositionBlock(Block: string){
    this.imgId = Block;
  }

  selectedBlock(Block: string, avion: boolean){
    if(this.pay)
      console.log("No puedes mirar otras cartas mientras tengas una deuda pendiente.")
    else{
      this.available = this.upgrade = this.decrease = this.sell = false;
      if(this.freeUpgrade)
        this.upgrade = true;
      this.imgId = Block;
      this.block = this.blocks.filter(block => block.id == Number(Block.substring(1, undefined)));
      this.block = this.block[0];
      if(this.block != undefined){
        if(avion){
          this.playerTurn.position = this.block.id;
          this.addRoomService.updatePlayer(this.playerTurn);
          this.avion = false;
          if(this.playerTurn.position != 25)
            this.actions(this.playerTurn);
        }
        else{
          if(this.playerTurn.id == this.cookieService.get('playerId')){
            if(this.block.class != 'Airplane' && this.block.class != 'Tax' && this.block.class != 'Sail' && this.block.class != 'Fortune' && this.block.class != 'Carnival' && this.block.class != 'Jail'){
              if(this.block.owner == this.playerTurn.id){
                if(this.block.class == 'Puerto')
                  this.sell = true; 
                else if(this.block.currentLevel > 0)
                  this.decrease = true;
                else
                  this.sell = true;
              }
            }
          }   
        }
      }
    } 
  }

  buyProperty(){
    this.playerTurn.money -= this.block.levelParams[0].price;
    if(this.block.class == "Puerto")
      this.playerTurn.ports += 1;
    this.playerTurn.propieties += 1;
    this.block.owner = this.playerTurn.id;
    this.block.ownerColor = this.playerTurn.color;
    this.bought = true;
    this.available = false;
    this.addRoomService.updatePlayer(this.playerTurn);
    this.addRoomService.updateProperty(this.room, this.block);
    console.log("Propiedad adquirida")
  }

  async payRent(){
    let rent: number = 0;
    this.propertyOwner = this.players.filter(player => player.id == this.block.owner);
    if(this.block.class == "Puerto"){
      rent =  this.block.levelParams[0].income
      for(let i = 1; i <= this.propertyOwner[0].ports; i++)
        rent *= 2
    }
    else
      rent = await this.block.levelParams[this.block.currentLevel].income;
    
    console.log("El jugador: ", this.playerTurn.name, "tenia", this.playerTurn.money, "Y paga: ", rent, ". Ahora le quedan : ", this.playerTurn.money-rent);
    this.playerTurn.money -=  rent;
    this.addRoomService.updatePlayer(this.playerTurn);
    
    
    this.getRent(await this.propertyOwner[0], rent);
    this.pay = false;
  }

  getRent(owner: Player, rent: number){
    console.log("El jugador: ", owner.name, "tenia", owner.money, "Y recibe: $", rent);
    owner.money += rent;
    this.addRoomService.updatePlayer(this.propertyOwner[0]);

  }

  async improveProperty(){
    if(this.freeUpgrade == false){
      this.playerTurn.money -= this.block.levelParams[this.block.currentLevel].price
      console.log("La propiedad ha subido de nivel.")
    }
    else
      console.log("La propiedad subió de nivel gratuitamente.")
    this.block.currentLevel += 1;
    this.freeUpgrade == false;
    this.upgrade == false;
    this.addRoomService.updateProperty(this.room, this.block);
    this.addRoomService.updatePlayer(await this.playerTurn);
  }

  decreaseProperty(){
    this.block.currentLevel -= 1;
    if(this.block.currentLevel == 0){
      this.decrease = false;
      this.sell = true;
    }
    this.playerTurn.money += this.block.levelParams[0].price / 2;
    this.addRoomService.updateProperty(this.room, this.block);
    this.addRoomService.updatePlayer(this.playerTurn);
  }

  sellProperty(){
    if(this.block.class == "Puerto")
      this.playerTurn.ports -= 1;
    this.block.currentLevel = 0;
    this.block.owner = "";
    this.block.ownerColor = "transparent";
    this.playerTurn.money += (this.block.levelParams[0].price / 2);
    this.addRoomService.updateProperty(this.room, this.block);
    this.addRoomService.updatePlayer(this.playerTurn);
  }


  updateRoom(room: string){
    const roomDocRef = doc(this.firestore, `rooms/${room}`);
    onSnapshot(roomDocRef, (doc) => {
      this.roomParams = doc.data() as Room;
      this.started = this.roomParams.started;
      this.numbers = this.roomParams.dice;
      this.end = this.roomParams.rolled;
    })
  }

  updateMePlayer(room: string, player: string){
    const roomDocRef = doc(this.firestore, `players/${player}`);
    onSnapshot(roomDocRef, (doc) => {
      this.mePlayer = doc.data() as Player;
    })
  }
}
