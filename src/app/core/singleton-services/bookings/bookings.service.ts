import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Booking } from './Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private backendService: BackendService) { }

  getBookings() {
    return this.backendService.getBookings();
  }

  getBooking(monthId: String) {
    return this.backendService.getBooking(Number(monthId));
  }

  deleteBooking(monthId: String) {
    return this.backendService.deleteBooking(Number(monthId));
  }

  saveBooking(monthId: String, booking: Partial<Booking>) {
    return this.backendService.saveBooking(Number(monthId), booking);
  }
}
