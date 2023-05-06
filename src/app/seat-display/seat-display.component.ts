import { DataService } from './../data.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-seat-display',
  templateUrl: './seat-display.component.html',
  styleUrls: ['./seat-display.component.scss']
})
export class SeatDisplayComponent {
  @ViewChild('confirmationDialog') confirmationDialog!: ElementRef;
  @Input() seatsLimit!: Number;

  bookedSeats: String = '';
  seatsForm!: FormGroup
  seats = this.dataService.getSeats();
  printError: boolean = false;

  constructor(private fb: FormBuilder, public dataService: DataService) {
    this.seatsForm = this.fb.group({
      seats: this.fb.array([])
    })
  }

  ngOnInit() {

  }

  onCheckChange(e: any) {
    const seats: FormArray = this.seatsForm.get('seats') as FormArray;
    if (e.target.checked) {
      seats.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      seats.controls.forEach((item) => {
        if (item.value == e.target.value) {
          seats.removeAt(i);
          return;
        }
        i++;
      });
    }
    if (seats?.value.length > this.seatsLimit) {
      this.printError = true;
    }
    else {
      this.printError = false;
    }
  }

  closeModal() {
    this.confirmationDialog.nativeElement.close();
  }

  submit() {
    let seats = this.seatsForm.get('seats')?.value;
    if (seats.length == 0) {
      this.printError = true;
      return;
    }
    this.dataService.updateSeats(seats);
    this.bookedSeats = '';
    seats.forEach((seat: any) => {
      this.bookedSeats = this.bookedSeats.concat(seat + "\u00A0");
    })
    this.confirmationDialog.nativeElement.show();
    console.log(this.bookedSeats);
  }

}
