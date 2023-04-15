import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksSpecsComponent } from './blocks-specs/blocks-specs.component';
import { DiceComponent } from './dice/dice.component';
import { TableComponent } from './table/table.component';
import { PlayerComponent } from './player/player.component';
import { IndexComponent } from './index/index.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomListComponent } from './room-list/room-list.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { gsap } from 'gsap-trial';

@NgModule({
  declarations: [BlocksSpecsComponent, DiceComponent, TableComponent, PlayerComponent, IndexComponent, FormularioComponent, RoomListComponent, JoinRoomComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    BlocksSpecsComponent,
    DiceComponent,
    TableComponent,
    PlayerComponent,
    IndexComponent,
    FormularioComponent,
    RoomListComponent,
    JoinRoomComponent
  ]

})
export class ComponentsModule { }
