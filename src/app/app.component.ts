import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuCollapsed: boolean = true;

  // https://stackoverflow.com/questions/34700438/global-events-in-angular
}
