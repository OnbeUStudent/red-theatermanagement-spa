import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MoviesCacheService } from './movies-cache.service';

describe('MoviesService', () => {
  let service: MoviesCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MoviesCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
