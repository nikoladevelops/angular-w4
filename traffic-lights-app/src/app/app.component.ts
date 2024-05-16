import { Component, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from '../traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChildren(TrafficLightComponent)
  private trafficLightComponents!: QueryList<TrafficLightComponent>;

  isBreakDownDisabled:boolean = false

  ngAfterViewInit ():void{
    setTimeout(() => {
      this.startAllTrafficLights();
    }, 1000);
  }
  
  startAllTrafficLights(): void {
    this.trafficLightComponents.forEach(trafficLight => {
      trafficLight.startTrafficLight();
    });
  }

  breakDownAll():void{
    this.isBreakDownDisabled=true
    
    this.trafficLightComponents.forEach(trafficLight => {
      trafficLight.breakDown();
    });

    setTimeout(() => {
      this.isBreakDownDisabled=false
    }, 10000);
  }

}
