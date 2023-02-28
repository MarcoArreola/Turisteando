import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { RoomComponent } from './pages/room/room.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent 
  },
  {
    path: ':room/:id',
    component: RoomComponent
  },
  {
    path: ':lobby',
    component: LobbyComponent
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
