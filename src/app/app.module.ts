import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AboutComponent } from './areas/about/pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './core/singleton-services/backend/backend.service';
import { DashboardComponent } from './areas/dashboard/pages/dashboard/dashboard.component';
import { HeaderComponent } from './areas/app/header/header.component';
import { MovieListComponent } from './areas/movies/pages/movie-list/movie-list.component';
import { PageNotFoundComponent } from './areas/404/pages/page-not-found/page-not-found.component';
import { ConfigService } from './core/singleton-services/config/config.service';
import { APP_INITIALIZER } from '@angular/core';
import { LoginComponent } from './areas/login/login.component';
import { BookingsComponent } from './areas/bookings/bookings.component';
import { AuthInterceptor } from './core/singleton-services/auth/authconfig.interceptor';
import { BookingDetailsComponent } from './areas/booking-details/booking-details.component';
import { DeleteModalComponent } from './areas/bookings/delete-modal/delete-modal.component';
import { MoviesListComponent } from './areas/bookings/movies-list/movies-list.component';
import { CreateEditModalComponent } from './areas/bookings/create-edit-modal/create-edit-modal.component';

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    MovieListComponent,
    PageNotFoundComponent,
    LoginComponent,
    BookingsComponent,
    BookingDetailsComponent,
    DeleteModalComponent,
    MoviesListComponent,
    CreateEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppComponent,
    {
      // Loading ConfigService as part of APPINITIALIZER
      // ensures the application isn't started before the
      // config settings are loaded.
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BackendService,
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
