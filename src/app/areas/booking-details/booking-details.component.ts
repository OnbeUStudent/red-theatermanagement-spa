import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Booking } from 'src/app/core/singleton-services/bookings/Booking';
import { BookingsService } from 'src/app/core/singleton-services/bookings/bookings.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  private monthId: String | null;
  private booking: Booking | null;

  constructor(private bookingsService: BookingsService, private route: ActivatedRoute, private router: Router) { 
    this.monthId = "0";
    this.booking = null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      if(paramMap.get('monthId'))
        this.monthId = paramMap.get('monthId');
        this.bookingsService.getBooking(this.monthId || "0").subscribe((booking: Booking) => {
          this.booking = booking;
         });
    })
    
  }

  get getBooking() {
    return this.booking;
  }

  get getMonthId() {
    return this.monthId;
  }

  goBack() {
    this.router.navigate(["/bookings"]);
  }

}
