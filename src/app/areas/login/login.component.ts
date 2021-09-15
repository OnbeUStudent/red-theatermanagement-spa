import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/singleton-services/auth/auth.service';
import { FakeUser } from 'src/app/core/singleton-services/auth/FakeUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private fakeUsers: FakeUser[];

  constructor(private authService: AuthService) { 
    this.fakeUsers = [];
  }

  get getFakeUsers(): FakeUser[]{
    return this.fakeUsers;
  }

  ngOnInit(): void {
    this.authService.getFakeUsers().subscribe((res: FakeUser[]) => {
      this.fakeUsers = res;
    })
  }

  onLogin(currentUser: FakeUser) {
    this.authService.login(currentUser);
  }

}
