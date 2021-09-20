import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  constructor(private authService: AuthService) { }

  get shouldDisplayBookingEditControls() : boolean {
    return (this.authService.currentUser != null) && this.authService.currentUser.isSynthetic;
  }
}
