import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/singleton-services/auth/auth.service';
import { Movie } from 'src/app/core/singleton-services/movies/movie';

import { Booking } from 'src/app/core/singleton-services/bookings/Booking';
import { BookingsService } from 'src/app/core/singleton-services/bookings/bookings.service';
import { CreateEditModalComponent } from './create-edit-modal/create-edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

interface BookingsByMonth {
  [key: number]: Booking
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  private bookingsByMonth: BookingsByMonth;
  private allDates = [
    {"month": "09", "year": "2021"},
    {"month": "10", "year": "2021"},
    {"month": "11", "year": "2021"},
    {"month": "12", "year": "2021"},
    {"month": "01", "year": "2022"},
    {"month": "02", "year": "2022"},
    {"month": "03", "year": "2022"},
    {"month": "04", "year": "2022"},
    {"month": "05", "year": "2022"},
    {"month": "06", "year": "2022"},
    {"month": "07", "year": "2022"},
    {"month": "08", "year": "2022"},
  ];
  private selectedteMonthId: String;
  private action: String;

  @ViewChild('deleteModal') deleteModal: DeleteModalComponent | undefined;
  @ViewChild('createEditModal') createEditModal: CreateEditModalComponent | undefined;

  constructor(private bookingsService: BookingsService, private authService: AuthService, public router: Router) {
    this.bookingsByMonth = {};
    this.selectedteMonthId = "0";
    this.action = "Create";
   }

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe((bookings: Booking[]) => {
      // transform array of booking by month {"monthId": Booking}
      bookings.forEach((booking: Booking) => {
        this.bookingsByMonth[booking.monthId] = booking;
      });
    });
  }

  get getAllDates() {
    return this.allDates;
  }

  get getBookingsByMonth() {
    return this.bookingsByMonth;
  }

  get getAction() {
    return this.action;
  }

  toNumber(s:string) {
    return Number(s);
  }

  showBookingDetails(monthId: String) {
    this.router.navigate([`bookings/${monthId}`]);
  }

  handleCreateClick(monthId: String) {
    this.action = "Create";
    this.selectedteMonthId = monthId;
    this.createEditModal?.open();
  }

  handleEditClick(monthId: String) {
    this.action = "Edit";
    this.selectedteMonthId = monthId;
    this.createEditModal?.open();
  }

  handleDeleteClick(monthId: String) {
    this.selectedteMonthId = monthId;
    this.deleteModal?.open();
  }

  deleteBooking() {
    this.bookingsService.deleteBooking(this.selectedteMonthId)
    .subscribe(() => {
      delete this.bookingsByMonth[Number(this.selectedteMonthId)];
    });
  }

  saveBooking(movie: Movie) {
    this.bookingsService.saveBooking(this.selectedteMonthId, {
      "movieId": movie.movieId,
      "monthId": Number(this.selectedteMonthId)
    }).subscribe(() => {
      this.bookingsByMonth[Number(this.selectedteMonthId)] = {
        ...this.bookingsByMonth[Number(this.selectedteMonthId)],
        movie: movie,
        movieId: movie.movieId
      };
    });
  }
}
