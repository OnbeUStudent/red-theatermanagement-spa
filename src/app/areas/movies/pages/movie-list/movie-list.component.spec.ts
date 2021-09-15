import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockProvider } from '@ngneat/spectator';

import { MovieListComponent } from './movie-list.component';
import { ConfigService } from 'src/app/core/singleton-services/config/config.service';
import { BackendService } from 'src/app/core/singleton-services/backend/backend.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ MovieListComponent ],
      providers: [
        mockProvider(ConfigService, {
          apiBaseUrl: 'http://localhost:1234'
        }),
        BackendService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
