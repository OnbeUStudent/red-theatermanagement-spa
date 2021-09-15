import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProvider } from '@ngneat/spectator';

import { ConfigService } from './../../../../core/singleton-services/config/config.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        mockProvider(ConfigService, {
          apiBaseUrl: '/example-api-base-url',
          production: false
        })
      ],
      declarations: [AboutComponent]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have appropriate default values', () => {
    expect(component.apiBaseUrl).toBe('/example-api-base-url');
    expect(component.production).toBeFalse();
  });
});
