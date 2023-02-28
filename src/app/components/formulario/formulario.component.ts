import { Component, OnInit } from '@angular/core';
import { Peon } from 'src/app/Interfaces/peon';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{
  public money: number = 1000;
  public MAX_MONEY: number = 5000;
  public peonList: Peon[] = [];
  public privado: boolean = false;

  ngOnInit(): void {
    this.peonList = this.getPeones();
  }

  getPeones(): Peon[]{
    const peonList: Peon[] = [
      {imagen: '../assets/FICHAS/1.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/2.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/3.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/4.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/5.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/6.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/7.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/8.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/9.png', nombre: 'Ajolotito'},
      {imagen: '../assets/FICHAS/10.png', nombre: 'Ajolotito'}
    ];
    return peonList;
  }

  startGame(): void{
    
  }
}
