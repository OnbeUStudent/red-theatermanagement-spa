import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../movies/movie';
import { ConfigService } from './../config/config.service';
import { FakeUser } from '../auth/FakeUser';
import { Booking } from '../bookings/Booking';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  get apiBaseUrl(): string
  {
    return this.configService.apiBaseUrl;
  }

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService) {}

  getMovies(): Observable<Movie[]> {
    const moviesUrl = `${this.apiBaseUrl}/api/movies`;
    return this.httpClient.get<Movie[]>(moviesUrl);
  }

  getFakeUsers(): Observable<FakeUser[]> {
    return this.httpClient.get<FakeUser[]>(`${this.apiBaseUrl}/fake-users`);
  }

  getBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.apiBaseUrl}/api/bookings`);
  }

  getBooking(monthId: Number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.apiBaseUrl}/api/bookings/${monthId}`);
  }

  deleteBooking(monthId: Number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiBaseUrl}/api/bookings/${monthId}`);
  }

  saveBooking(monthId: Number, booking: Partial<Booking>): Observable<any> {
    return this.httpClient.put<any>(`${this.apiBaseUrl}/api/bookings/${monthId}`, booking);
  }
}
