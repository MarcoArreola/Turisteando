import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service/lib/cookie.service';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService, ]
})
export class PagesModule { }
