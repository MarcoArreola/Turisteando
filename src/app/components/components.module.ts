import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksSpecsComponent } from './blocks-specs/blocks-specs.component';
import { DiceComponent } from './dice/dice.component';
import { TableComponent } from './table/table.component';
import { PlayerComponent } from './player/player.component';
import { IndexComponent } from './index/index.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BlocksSpecsComponent, DiceComponent, TableComponent, PlayerComponent, IndexComponent, FormularioComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    BlocksSpecsComponent,
    DiceComponent,
    TableComponent,
    PlayerComponent,
    IndexComponent,
    FormularioComponent
  ]

})
export class ComponentsModule { }
