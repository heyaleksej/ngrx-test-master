import { Component } from '@angular/core';
import { AppFacade } from "./store/app.facades";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public app: AppFacade,
  ) {
    this.app.loadUsers()
  }
}
