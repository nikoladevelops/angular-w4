import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeoutInfo } from 'rxjs';

@Component({
  selector: 'traffic-light',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css'
})
export class TrafficLightComponent {
  @Input() orientation: string = 'horizontal';
  @Input() startColor: string = "red"

  currentColor:string="";
  previousColor:string="";

  breakDownOccurred:boolean = false
  isBreakDownBtnDisabled:boolean = false

  startTrafficLight(){
    if(this.breakDownOccurred){
      return;
    }

    let time:number = this.getTimeBeforeChangingColor(this.startColor)
    this.currentColor = this.startColor;

    setTimeout(() => {
      this.getNextColor()
    }, time);
  }
  
  getNextColor():void{
    if(this.breakDownOccurred){
      return;
    }

    if(this.currentColor === "red" || this.currentColor === "green"){
      this.previousColor = this.currentColor
      this.currentColor="yellow"
    }else{
      if(this.previousColor == "red"){
        this.currentColor="green"
      }else if(this.previousColor == "green"){
        this.currentColor="red"
      }else{
        // if no previous color was set, just set it to green always
        this.currentColor="green"
      }

    }

    let time:number = this.getTimeBeforeChangingColor(this.currentColor)
    setTimeout(() => {
      this.getNextColor();
      
    }, time);

    

  }

  getTimeBeforeChangingColor(color:string):number{
    switch (color) {
      case "red":
      case "green":
        return 5000
      case "yellow":
        return 2000
      default:
        return -1
    }
  }

  tryCrossing(){
    if(this.currentColor === "yellow"){
      alert("Wrong crossing! You shouldn't cross when it's yellow!")
    }
  }

  breakDown(){
    let timesExecuted = 0;
    this.breakDownOccurred=true;

    const intervalId = setInterval(() => {
      if (timesExecuted === 10) {
        clearInterval(intervalId);
        this.breakDownOccurred = false;
        this.startTrafficLight();


        return;
      }

      if(this.currentColor!= "yellow"){
        this.currentColor = "yellow"
      }else{
        this.currentColor=""
      }

      timesExecuted += 1;
    }, 1000);
  }

}
