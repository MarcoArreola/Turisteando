import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Blocks } from 'src/app/Interfaces/blocks';
import { Peon } from 'src/app/Interfaces/peon';
import propiety from 'src/app/Interfaces/propiety';
import Room from 'src/app/Interfaces/room';
import { AddRoomService } from 'src/app/services/add-room.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  rooms: Room[] | undefined;
  MAX_MONEY: number = 5000;
  peonList: Peon[] = [];
  room: Room;

  constructor( private addRoomService: AddRoomService, 
               private router: Router,
               private cookieService: CookieService ){
    this.room = {
      id: "",
      name: "",
      password: "",
      money: 1000,
      owner: "",
      started: false,
      private: false,
      playersNum: 0,
      players: [],
      dice: [0,0],
      turn: -1,
      pairs: 0,
      rolled: false,
    }
  }
    
  ngOnInit(): void {

  }

 

  async createRoom(){
    this.room.id = (await this.addRoomService.addRoom(this.room)).id;
    this.cookieService.set('roomId', this.room.id);
    this.addRoomService.updateId(this.room);
    await this.router.navigate(['/','room', this.room.id]);
    this.createPropieties();
  }

  createPropieties(){
    this.properties.forEach(async property => {
      property.dbId = await this.addRoomService.setBlock(this.room.id, property);
      this.addRoomService.updateProperty(this.room.id , property);
    })
    this.blocks.forEach(block => {
      this.addRoomService.setBlock(this.room.id, block);
    })
    
  }

  properties: propiety[] = [
    {id: 2, dbId: "", name: "Jardin Etnobotanico", class: "Oaxaca", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 100, income: 30},
                                                                      {level: 1, price: 50, income: 90},
                                                                      {level: 2, price: 50, income: 270},
                                                                      {level: 3, price: 80, income: 400}
                                                                    ], currentLevel:0, profit: 0},
    {id: 3, dbId: "", name: "Mercado de Artesanias", class: "Oaxaca", owner: "", ownerColor: "", levelParams:[
                                                                    {level: 0, price: 120, income: 36},
                                                                    {level: 1, price: 50, income: 100},
                                                                    {level: 2, price: 50, income: 290},
                                                                    {level: 3, price: 80, income: 420}
                                                                    ], currentLevel:0, profit: 0},  
    {id: 4, dbId: "", name: "Palenque de Mezcal", class: "Oaxaca", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 150, income: 42},
                                                                      {level: 1, price: 50, income: 110},
                                                                      {level: 2, price: 50, income: 300},
                                                                      {level: 3, price: 80, income: 450}
                                                                    ], currentLevel:0, profit: 0},                                                              
    {id: 7, dbId: "", name: "Cañon del sumidero", class: "Chiapas", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 180, income: 50},
                                                                      {level: 1, price: 100, income: 185},
                                                                      {level: 2, price: 100, income: 325},
                                                                      {level: 3, price: 150, income: 550}
                                                                    ], currentLevel:0, profit: 0},
    {id: 8, dbId: "", name: "Palenque", class: "Chiapas", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 210, income: 58},
                                                                      {level: 1, price: 100, income: 210},
                                                                      {level: 2, price: 100, income: 375},
                                                                      {level: 3, price: 150, income: 640}
                                                                    ], currentLevel:0, profit: 0},
    {id: 10, dbId: "", name: "Catedral de Puebla", class: "Puebla", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 240, income: 62},
                                                                      {level: 1, price: 100, income: 250},
                                                                      {level: 2, price: 100, income: 450},
                                                                      {level: 3, price: 150, income: 725}
                                                                    ], currentLevel:0, profit: 0},
    {id: 11, dbId: "", name: "Fuertes de Loreto", class: "Puebla", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 260, income: 75},
                                                                      {level: 1, price: 100, income: 300},
                                                                      {level: 2, price: 100, income: 500},
                                                                      {level: 3, price: 150, income: 790}
                                                                    ], currentLevel:0, profit: 0},
    {id: 14, dbId: "", name: "Faro de Mazatlan", class: "Sinaloa", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 280, income: 80},
                                                                      {level: 1, price: 150, income: 330},
                                                                      {level: 2, price: 150, income: 600},
                                                                      {level: 3, price: 200, income: 800}
                                                                    ], currentLevel:0, profit: 0},
    {id: 15, dbId: "", name: "Malecon Mazatlan", class: "Sinaloa", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 300, income: 88},
                                                                      {level: 1, price: 150, income: 360},
                                                                      {level: 2, price: 150, income: 650},
                                                                      {level: 3, price: 200, income: 850}
                                                                    ], currentLevel:0, profit: 0},
    {id: 16, dbId: "", name: "Observatorio", class: "Sinaloa", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 340, income: 92},
                                                                      {level: 1, price: 150, income: 380},
                                                                      {level: 2, price: 150, income: 700},
                                                                      {level: 3, price: 200, income: 975}
                                                                    ], currentLevel:0, profit: 0},
    {id: 18, dbId: "", name: "Callejon el Beso", class: "Guanajuato", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 350, income: 100},
                                                                      {level: 1, price: 200, income: 390},
                                                                      {level: 2, price: 200, income: 710},
                                                                      {level: 3, price: 250, income: 950}
                                                                    ], currentLevel:0, profit: 0},
    {id: 19, dbId: "", name: "San Miguel Allende", class: "Guanajuato", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 350, income: 100},
                                                                      {level: 1, price: 200, income: 390},
                                                                      {level: 2, price: 200, income: 710},
                                                                      {level: 3, price: 250, income: 950}
                                                                    ], currentLevel:0, profit: 0},
    {id: 20 , dbId: "", name: "Museo Momias", class: "Guanajuato", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 370, income: 110},
                                                                      {level: 1, price: 200, income: 410},
                                                                      {level: 2, price: 200, income: 730},
                                                                      {level: 3, price: 250, income: 1000}
                                                                    ], currentLevel:0, profit: 0},
    {id: 23, dbId: "", name: "Tequila", class: "Jalisco", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 380, income: 115},
                                                                      {level: 1, price: 200, income: 425},
                                                                      {level: 2, price: 200, income: 750},
                                                                      {level: 3, price: 250, income: 1020}
                                                                    ], currentLevel:0, profit: 0},
    {id: 24, dbId: "", name: "Zapopan", class: "Jalisco", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 400, income: 124},
                                                                      {level: 1, price: 200, income: 435},
                                                                      {level: 2, price: 200, income: 780},
                                                                      {level: 3, price: 250, income: 1040}
                                                                    ], currentLevel:0, profit: 0},
    {id: 26, dbId: "", name: "Angel Independencia", class: "CDMX", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 410, income: 130},
                                                                      {level: 1, price: 200, income: 440},
                                                                      {level: 2, price: 200, income: 770},
                                                                      {level: 3, price: 250, income: 1045}
                                                                    ], currentLevel:0, profit: 0},
    {id: 27, dbId: "", name: "Teotihuacan", class: "CDMX", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 460, income: 138},
                                                                      {level: 1, price: 200, income: 448},
                                                                      {level: 2, price: 200, income: 786},
                                                                      {level: 3, price: 250, income: 1050}
                                                                    ], currentLevel:0, profit: 0},
    {id: 28, dbId: "", name: "Bellas Artes", class: "CDMX", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 500, income: 146},
                                                                      {level: 1, price: 200, income: 454},
                                                                      {level: 2, price: 200, income: 792},
                                                                      {level: 3, price: 250, income: 1060}
                                                                    ], currentLevel:0, profit: 0},
    {id: 30, dbId: "", name: "Chicen Itza", class: "Quintana Roo", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 550, income: 150},
                                                                      {level: 1, price: 250, income: 500},
                                                                      {level: 2, price: 250, income: 820},
                                                                      {level: 3, price: 300, income: 1100}
                                                                    ], currentLevel:0, profit: 0},
    {id: 32, dbId: "", name: "Xcaret", class: "Quintana Roo", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 600, income: 160},
                                                                      {level: 1, price: 250, income: 600},
                                                                      {level: 2, price: 250, income: 850},
                                                                      {level: 3, price: 300, income: 1200}
                                                                    ], currentLevel:0, profit: 0},
    {id: 5, dbId: "", name: "Manzanillo", class: "Puerto", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                      ], currentLevel:0, profit: 0},
    {id: 13, dbId: "", name: "Mazatlan", class: "Puerto", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                      ], currentLevel:0, profit: 0},
    {id: 21, dbId: "", name: "Manzanillo", class: "Puerto", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                       ], currentLevel:0, profit: 0},
    {id: 29, dbId: "", name: "Altamira", class: "Puerto", owner: "", ownerColor: "", levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                    ], currentLevel:0, profit: 0},
    ];

  blocks: Blocks[] = [{id: 1, class: "Sail"}, 
                      {id: 6, class: "Fortune"},
                      {id: 9, class: "Jail"},
                      {id: 12, class: "Fortune"},
                      {id: 17, class: "Carnival"},
                      {id: 22, class: "Fortune"},
                      {id: 25, class: "Airplane"},
                      {id: 31, class: "Tax"},]
}
