import { DataService } from './../data.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seat-input',
  templateUrl: './seat-input.component.html',
  styleUrls: ['./seat-input.component.scss']
})
export class SeatInputComponent {

  @Output() seatsLimit = new EventEmitter<Number>();
  public inputForm!: FormGroup;
  public disableSubmit = false
  public overflowSeats = false;
  public seats: any;

  constructor(private dataService: DataService) {
    this.dataService.data.subscribe((seats) => {
      this.seats = seats;
      let allTrue = true;
      seats.forEach((element: any) => {
        if (!element.disabled) {
          allTrue = false;
        }
      });
      if (allTrue) this.disableSubmit = true;
    })
    this.inputForm = new FormGroup({
      seats: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.max(7)])
    })
  }

  ngOnInt() {

  }

  changeSeats(event: any) {
    this.overflowSeats = false;
    let countOfAvailableSeats = 0;
    this.seats.forEach((element: any) => {
      if (!element.disabled) {
        countOfAvailableSeats++;
      }
    });
    if (countOfAvailableSeats < this.inputForm.get('seats')?.value) this.overflowSeats = true;
  }

  submit() {
    this.dataService.showSeatsDisplay = true;
    this.seatsLimit.emit(this.inputForm.get('seats')?.value);
  }

  clearSeats() {
    this.dataService.showSeatsDisplay = false;
    this.dataService.clearSeats();
  }

}
