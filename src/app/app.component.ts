import { Component } from '@angular/core';

import { AppReadyEventService } from './app-ready-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( appReadyEventService: AppReadyEventService ) {

    // Trigger the event that the pre-bootstrap loading screen is listening
    // for. This will initiate the teardown of the loading screen
    appReadyEventService.trigger();

  }

}
