import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Player from 'src/app/Interfaces/player';
import Propiety from 'src/app/Interfaces/propiety';

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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit{
  @Input() imageId: string = '0';
  @Output() newId = new EventEmitter<string>();
  @Input() avion: boolean = false;
  @Input() player!: Player;
  @Input() Bought!: boolean;
  @Input() Properties!: any[];

  owners!: property[];

  showSpecs(Block: string){
    this.imageId = Block;
    this.newId.emit(this.imageId);
  }

  ngOnChanges(){
    if(this.Properties != undefined){
      this.Properties.forEach((property: any) => {
        if(property.owner != undefined && property.owner != ""){
          let blockId = "O" + property.id.toString();
          let blockOwner = document.getElementById(blockId) as HTMLElement;
          blockOwner.style.backgroundColor = property.ownerColor
          if(property.currentLevel > 0)
            blockOwner.innerHTML = property.currentLevel;
        }
      });
    }
    
  }
  ngOnInit(): void {

  } 
}
