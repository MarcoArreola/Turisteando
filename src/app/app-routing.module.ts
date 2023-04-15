import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './pages/credits/credits.component';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { RoomComponent } from './pages/room/room.component';
import { RulesComponent } from './pages/rules/rules.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent 
  },
  {
    path: ':room/:id',
    component: RoomComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'rules', 
    component: RulesComponent
  },
  {
    path: 'credits', 
    component: CreditsComponent
  },
  { path: '**', 
    pathMatch: 'full', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
