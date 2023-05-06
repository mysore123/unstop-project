import { DataService } from './data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unstop-project';
  limit!: Number;
  constructor(public dataService: DataService) {
    this.dataService.setSeats();
    this.dataService.data.subscribe((seats) => {
      console.log(seats);
    })

  }

  getSeatsLimit(limit: Number) {
    this.limit = limit;
  }
}
