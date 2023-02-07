import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service/lib/cookie.service';
import { SocketIoService } from '../socket-io.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CookieService, SocketIoService],

})
export class PagesModule { }
