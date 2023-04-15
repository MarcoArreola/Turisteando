import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ComponentsModule } from "./components/components.module";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, collection } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { RulesComponent } from './pages/rules/rules.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { gsap } from 'gsap';

@NgModule({
    declarations: [
        AppComponent,
        RoomComponent,
        HomeComponent,
        LobbyComponent,
        RulesComponent,
        CreditsComponent,
    ],
    providers: [CookieService],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ComponentsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
    ]
})
export class AppModule { }
