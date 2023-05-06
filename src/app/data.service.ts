import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  showSeatsDisplay: Boolean = false
  seats!: Array<any>;
  seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  private dataSource = new BehaviorSubject<any>([]);
  public data = this.dataSource.asObservable();

  constructor() {
  }

  getSeats() {
    if (localStorage.getItem('seats')) {
      this.seats = JSON.parse(localStorage.getItem('seats') as any);
    }
    return this.seats;
  }

  clearSeats() {
    if (localStorage.getItem('seats')) {
      let seats = this.initializeSeats();
      this.updateLocalStorage(seats);
    }
  }

  setSeats() {
    if (localStorage.getItem('seats')) {
      this.dataSource.next(JSON.parse(localStorage.getItem('seats') as any));
    }
    else {
      let seats = this.initializeSeats();
      this.updateLocalStorage(seats);
    }
  }

  updateLocalStorage(seats: Array<any>) {
    this.dataSource.next(seats);
    localStorage.setItem('seats', JSON.stringify(seats));
  }

  updateSeats(seats: Array<any>) {
    seats.forEach((seat) => {
      this.dataSource.getValue().forEach((element: any) => {
        if (element.name == seat) {
          element.disabled = true;
        }
      });
    });
    this.updateLocalStorage(this.dataSource.getValue())
  }

  initializeSeats() {
    let seats = [];
    for (let i = 1; i < 8; i++) {
      for (let j = 0; j < this.seatLetters.length; j++) {
        seats?.push({ 'name': i.toString() + this.seatLetters[j], 'checked': false, 'disabled': false })
      }
    }
    for (let i = 8; i < 9; i++) {
      seats?.push({ 'name': i.toString() + this.seatLetters[0], 'checked': false, 'disabled': false })
      seats?.push({ 'name': i.toString() + this.seatLetters[1], 'checked': false, 'disabled': false })
      seats?.push({ 'name': i.toString() + this.seatLetters[2], 'checked': false, 'disabled': false })
    }
    return seats;
  }

}
