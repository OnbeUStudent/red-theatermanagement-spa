import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockProvider } from '@ngneat/spectator';

import { BackendService } from './backend.service';
import { ConfigService } from '../config/config.service';

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        mockProvider(ConfigService, {
          apiBaseUrl: '/api'
        })
      ]
    });
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should have correct apiBaseUrl', () => {
    expect(service.apiBaseUrl).toBe('/api');
  });
});
