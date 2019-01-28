import { Component } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styles: [``]
  })
export class CarComponent {
  public name = 'SomeCar';
  public rase = 21420;
  protected tank = 50;
  public amountOfFuel = 28;
  public characteristics: string[] = ['Двигатель 2 литра', 'Максимальная скорость 180 км/ч', 'Черного цвета'];
  public report: string;
  public refuel = false;
  public posibleToFillUp: number = this.tank - this.amountOfFuel;
  public maxRoad = 233.33;
  public way: number;
  public freeeTankSpase: number = this.tank - this.amountOfFuel;
  drive(way: number) {
    this.maxRoad = Math.round(this.amountOfFuel * 10000 / 12) / 100;
    console.log(this.maxRoad);

    if ( way > this.maxRoad || way < 0) {
      this.message('warning');
      if (this.amountOfFuel < this.tank) {
        this.refuel = true;
      }
    } else
    if (way > this.maxRoad - 50) {
      this.rase += way;
      this.amountOfFuel = +(this.amountOfFuel - way * 0.12).toFixed(4);
      this.freeeTankSpase = this.tank - this.amountOfFuel;
      this.message('attention');
      this.refuel = true;
    } else
    if (way < this.maxRoad - 50) {
      this.refuel = false;
      this.rase += way;
      this.amountOfFuel =  +(this.amountOfFuel - way * 0.12).toFixed(4);
      this.freeeTankSpase = this.tank - this.amountOfFuel;
      this.message('fine');
    }
    this.maxRoad = Math.round(this.amountOfFuel * 10000 / 12) / 100;
    console.log(this.maxRoad);
  }

  message (type: string) {
    switch (type) {
      case 'warning': this.report = 'Керосина не достаточно!';
      break;
      case 'attention' : this.report = 'Хъюстон, мало топлива, дозаправтесь!';
      break;
      case 'fine' : this.report = 'В Магадан!';
      break;
      case 'Dou' : this.report = 'Роснефть благодарит вас за тупость! )) Можете ехать!';
      break;
    }
  }
  fillUp(value: number) {
    this.freeeTankSpase = this.tank - this.amountOfFuel;
    if (value >= this.freeeTankSpase) {
      this.amountOfFuel = 50;
      this.maxRoad = Math.round(this.amountOfFuel * 10000 / 12) / 100;
      this.message ('Dou');
    } else {
      this.amountOfFuel += value;
      this.maxRoad = Math.round(this.amountOfFuel * 10000 / 12) / 100;
      this.message('fine');
      this.refuel = false;
    }
    if (this.amountOfFuel < 6) {
      this.message('attention');
      this.refuel = true;
    }
  }
}
