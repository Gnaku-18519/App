import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular'; //Hot Module Replacement (HMR) -- whenever the source code is modified, Webpack automatically refreshes the browser
}
