import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {

  constructor(){
  
  }
  
  rollSocketDice(numbers: number[], emit: boolean){
    const dice = [...document.querySelectorAll(".die-list")];
    if(emit){
      this.toggleClasses(dice[0]);
      dice[0] = dice[0] as HTMLElement;
      if( dice[0] instanceof HTMLElement){
        numbers[0] = this.getRandomNumber(1,6);
        dice[0].dataset['roll'] = numbers[0].toString();
      }
      this.toggleClasses(dice[1]);
      dice[1] = dice[1] as HTMLElement;
      if( dice[1] instanceof HTMLElement){
        numbers[1] = this.getRandomNumber(1,6);
        dice[1].dataset['roll'] = numbers[1].toString();
      }
      console.log(numbers);
    }
    else{
      this.toggleClasses(dice[0]);
      dice[0] = dice[0] as HTMLElement;
      if(dice[0] instanceof HTMLElement)
        dice[0].dataset['roll'] = numbers[0].toString();

      this.toggleClasses(dice[1]);
      dice[1] = dice[1] as HTMLElement;
      if(dice[1] instanceof HTMLElement)
        dice[1].dataset['roll'] = numbers[1].toString(); 
    }
  }
  rollDice(numberss: number [],emit: boolean) {
    const dice = [...document.querySelectorAll(".die-list")];
    const numbers: number [] = [];
    dice.forEach((die) => {
      this.toggleClasses(die);
      die = die as HTMLElement;
      if( die instanceof HTMLElement){
        let number = this.getRandomNumber(1,6).toString();
        die.dataset['roll'] = number;
        numbers[numbers.length] = Number(number);
      }
    });
    console.log(numbers);
  }

  toggleClasses(die: any) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");   
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
