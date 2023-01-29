import { Component } from '@angular/core';

interface property{
  id: number;
  name: string;
  block: string;
  owner: number;
  levelParams: level[];
  currentLevel: number;
  profit: number;

}

interface level{
  level: number;
  price: number;
  income: number;
}

interface player{
  id: number;
  name: string;
  money: number;
  propieties: number[];
  bankruptcy: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Turisteando';

  properties: property[] = [
    {id: 2, name: "Jardin Etnobotanico", block: "Oaxaca", owner: 0, levelParams:[
                                                                      {level: 0, price: 100, income: 30},
                                                                      {level: 1, price: 50, income: 90},
                                                                      {level: 2, price: 50, income: 270},
                                                                      {level: 3, price: 80, income: 400}
                                                                    ], currentLevel:0, profit: 0},
    {id: 3, name: "Mercado de Artesanias", block: "Oaxaca", owner: 0, levelParams:[
                                                                    {level: 0, price: 120, income: 36},
                                                                    {level: 1, price: 50, income: 100},
                                                                    {level: 2, price: 50, income: 290},
                                                                    {level: 3, price: 80, income: 420}
                                                                    ], currentLevel:0, profit: 0},  
    {id: 4,name: "Palenque de Mezcal", block: "Oaxaca", owner: 0, levelParams:[
                                                                      {level: 0, price: 150, income: 42},
                                                                      {level: 1, price: 50, income: 110},
                                                                      {level: 2, price: 50, income: 300},
                                                                      {level: 3, price: 80, income: 450}
                                                                    ], currentLevel:0, profit: 0},                                                              
    {id: 7, name: "Cañon del sumidero", block: "Chiapas", owner: 0, levelParams:[
                                                                      {level: 0, price: 180, income: 50},
                                                                      {level: 1, price: 100, income: 185},
                                                                      {level: 2, price: 100, income: 325},
                                                                      {level: 3, price: 150, income: 550}
                                                                    ], currentLevel:0, profit: 0},
    {id: 8, name: "Palenque", block: "Chiapas", owner: 0, levelParams:[
                                                                      {level: 0, price: 210, income: 58},
                                                                      {level: 1, price: 100, income: 210},
                                                                      {level: 2, price: 100, income: 375},
                                                                      {level: 3, price: 150, income: 640}
                                                                    ], currentLevel:0, profit: 0},
    {id: 10, name: "Catedral de Puebla", block: "Puebla", owner: 0, levelParams:[
                                                                      {level: 0, price: 240, income: 62},
                                                                      {level: 1, price: 100, income: 250},
                                                                      {level: 2, price: 100, income: 450},
                                                                      {level: 3, price: 150, income: 725}
                                                                    ], currentLevel:0, profit: 0},
    {id: 11, name: "Fuertes de Loreto", block: "Puebla", owner: 0, levelParams:[
                                                                      {level: 0, price: 260, income: 75},
                                                                      {level: 1, price: 100, income: 300},
                                                                      {level: 2, price: 100, income: 500},
                                                                      {level: 3, price: 150, income: 790}
                                                                    ], currentLevel:0, profit: 0},
    {id: 14, name: "Faro de Mazatlan", block: "Sinaloa", owner: 0, levelParams:[
                                                                      {level: 0, price: 280, income: 80},
                                                                      {level: 1, price: 150, income: 330},
                                                                      {level: 2, price: 150, income: 600},
                                                                      {level: 3, price: 200, income: 800}
                                                                    ], currentLevel:0, profit: 0},
    {id: 15, name: "Malecon Mazatlan", block: "Sinaloa", owner: 0, levelParams:[
                                                                      {level: 0, price: 300, income: 88},
                                                                      {level: 1, price: 150, income: 360},
                                                                      {level: 2, price: 150, income: 650},
                                                                      {level: 3, price: 200, income: 850}
                                                                    ], currentLevel:0, profit: 0},
    {id: 16, name: "Observatorio", block: "Sinaloa", owner: 0, levelParams:[
                                                                      {level: 0, price: 340, income: 92},
                                                                      {level: 1, price: 150, income: 380},
                                                                      {level: 2, price: 150, income: 700},
                                                                      {level: 3, price: 200, income: 975}
                                                                    ], currentLevel:0, profit: 0},
    {id: 18, name: "Callejon el Beso", block: "Guanajuato", owner: 0, levelParams:[
                                                                      {level: 0, price: 350, income: 100},
                                                                      {level: 1, price: 200, income: 390},
                                                                      {level: 2, price: 200, income: 710},
                                                                      {level: 3, price: 250, income: 950}
                                                                    ], currentLevel:0, profit: 0},
    {id: 19, name: "San Miguel Allende", block: "Guanajuato", owner: 0, levelParams:[
                                                                      {level: 0, price: 350, income: 100},
                                                                      {level: 1, price: 200, income: 390},
                                                                      {level: 2, price: 200, income: 710},
                                                                      {level: 3, price: 250, income: 950}
                                                                    ], currentLevel:0, profit: 0},
    {id: 20 ,name: "Museo Momias", block: "Guanajuato", owner: 0, levelParams:[
                                                                      {level: 0, price: 370, income: 110},
                                                                      {level: 1, price: 200, income: 410},
                                                                      {level: 2, price: 200, income: 730},
                                                                      {level: 3, price: 250, income: 1000}
                                                                    ], currentLevel:0, profit: 0},
    {id: 23,name: "Tequila", block: "Jalisco", owner: 0, levelParams:[
                                                                      {level: 0, price: 380, income: 115},
                                                                      {level: 1, price: 200, income: 425},
                                                                      {level: 2, price: 200, income: 750},
                                                                      {level: 3, price: 250, income: 1020}
                                                                    ], currentLevel:0, profit: 0},
    {id: 24, name: "Zapopan", block: "Jalisco", owner: 0, levelParams:[
                                                                      {level: 0, price: 400, income: 124},
                                                                      {level: 1, price: 200, income: 435},
                                                                      {level: 2, price: 200, income: 780},
                                                                      {level: 3, price: 250, income: 1040}
                                                                    ], currentLevel:0, profit: 0},
    {id: 26, name: "Angel Independencia", block: "CDMX", owner: 0, levelParams:[
                                                                      {level: 0, price: 410, income: 130},
                                                                      {level: 1, price: 200, income: 440},
                                                                      {level: 2, price: 200, income: 770},
                                                                      {level: 3, price: 250, income: 1045}
                                                                    ], currentLevel:0, profit: 0},
    {id: 27, name: "Teotihuacan", block: "CDMX", owner: 0, levelParams:[
                                                                      {level: 0, price: 460, income: 138},
                                                                      {level: 1, price: 200, income: 448},
                                                                      {level: 2, price: 200, income: 786},
                                                                      {level: 3, price: 250, income: 1050}
                                                                    ], currentLevel:0, profit: 0},
    {id: 28, name: "Bellas Artes", block: "CDMX", owner: 0, levelParams:[
                                                                      {level: 0, price: 500, income: 146},
                                                                      {level: 1, price: 200, income: 454},
                                                                      {level: 2, price: 200, income: 792},
                                                                      {level: 3, price: 250, income: 1060}
                                                                    ], currentLevel:0, profit: 0},
    {id: 30, name: "Chicen Itza", block: "Quintana Roo", owner: 0, levelParams:[
                                                                      {level: 0, price: 550, income: 150},
                                                                      {level: 1, price: 250, income: 500},
                                                                      {level: 2, price: 250, income: 820},
                                                                      {level: 3, price: 300, income: 1100}
                                                                    ], currentLevel:0, profit: 0},
    {id: 32, name: "Xcaret", block: "Quintana Roo", owner: 0, levelParams:[
                                                                      {level: 0, price: 600, income: 160},
                                                                      {level: 1, price: 250, income: 600},
                                                                      {level: 2, price: 250, income: 850},
                                                                      {level: 3, price: 300, income: 1200}
                                                                    ], currentLevel:0, profit: 0},
    {id: 5, name: "Manzanillo", block: "Puerto", owner: 0, levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                      ], currentLevel:0, profit: 0},
    {id: 13, name: "Mazatlan", block: "Puerto", owner: 0, levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                      ], currentLevel:0, profit: 0},
    {id: 21, name: "Manzanillo", block: "Puerto", owner: 0, levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                       ], currentLevel:0, profit: 0},
    {id: 29, name: "Altamira", block: "Puerto", owner: 0, levelParams:[
                                                                      {level: 0, price: 200, income: 25}
                                                                    ], currentLevel:0, profit: 0},
    ];

  

  buyProperty(player: player, property: property){
      if(property.currentLevel == 0)
        if(player.money >= property.levelParams[0].price){
          player.propieties[this.properties.length] = property.id; // Add new property to a owner
          property.owner = player.id;
          console.log("Propiedad comprada exitosamente :)");
        }
        else
          console.log("No tienes dinero suficiente...");        
      else
        console.log("Esta propiedad le pertenece a alguien más...");
  }

  improveProperty(player: player, property: property){
      if(property.currentLevel < 3)
        if(player.money >= property.levelParams[property.currentLevel + 1].price){
          property.currentLevel += 1;
          console.log("Incremento de nivel exitoso :)");
        }
        else
          console.log("No tienes dinero suficiente...");
      else
        console.log("La propiedad esta máximo nivel...");
  }

  payRent(guest: player, property: property, owner: player){
    let rent: number = property.levelParams[property.currentLevel].income;
    if(guest.money < rent)
      if(guest.propieties.length == 0)
        guest.bankruptcy = true;
      else{
        let propertyToSell: property = property; // User has to select a property of his own.
        this.sellProperty(guest, propertyToSell);
        this.payRent(guest, property, owner);
      }
    else{
      guest.money -= rent;
      owner.money += rent;
    }
  }

  sellProperty(player: player, property: property){
      let total: number = 0;
      let level: number = property.currentLevel;
      for(let i = level; i<0; i--)
        total += property.levelParams[level].price;
      player.money += total;
      player.propieties.splice(player.propieties.indexOf(property.id), 1); // Removes the property id from his properties.
      property.owner = 0;
  }


}

/*ng generate component xyz
ng add @angular/material
ng add @angular/pwa
ng add _____
ng test
ng build*/