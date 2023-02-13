import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksSpecsComponent } from './blocks-specs/blocks-specs.component';
import { DiceComponent } from './dice/dice.component';
import { TableComponent } from './table/table.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [BlocksSpecsComponent, DiceComponent, TableComponent, PlayerComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    BlocksSpecsComponent,
    DiceComponent,
    TableComponent,
    PlayerComponent
  ]

})
export class ComponentsModule { }
