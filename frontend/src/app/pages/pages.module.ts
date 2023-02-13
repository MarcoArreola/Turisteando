import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service/lib/cookie.service';
import { SocketIoService } from '../socket-io.service';
import { BlocksSpecsComponent } from '../components/blocks-specs/blocks-specs.component';
import { DiceComponent } from '../components/dice/dice.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  providers: [CookieService, SocketIoService],

})
export class PagesModule { }
