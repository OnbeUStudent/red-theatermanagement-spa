import { Matchers, PactWeb } from '@pact-foundation/pact-web';
const { eachLike } = Matchers
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { mockProvider } from '@ngneat/spectator';

import { BackendService } from '../core/singleton-services/backend/backend.service';
import { Movie } from '../core/singleton-services/movies/movie';
import { ConfigService } from '../core/singleton-services/config/config.service';

describe('BackendService consumer-defined contracts', () => {
  let service: BackendService;
  let provider: PactWeb;
  let originalTimeout: number;

  beforeAll((done) => {
    provider = new PactWeb({
      host: '127.0.0.1',
      port: 1234,
      spec: 2
    });

    // Required if run with `singleRun: false`
    provider.removeInteractions().then(done);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterAll((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    provider.finalize().then(done, done.fail)
  });

  // describe('One or more movies', () => {
    beforeEach((done) => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [
          mockProvider(ConfigService, {
            apiBaseUrl: 'http://localhost:1234'
          }),
          BackendService
        ]
      });
      service = TestBed.inject(BackendService);
      provider
        .addInteraction(
          {
            state: "There are SOME movies",
            uponReceiving: "A GET request to retrieve the movies",
            withRequest: {
              method: "GET",
              path: "/api/movies",
            },
            willRespondWith: {
              status: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: eachLike(new Movie("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", "example-title")),
            },
          }
        )
        .then(() => {
          console.log('Interaction added');
          done();
        }
          , done.fail)
    });

    it("has one or more movies", (done) => {
      service.getMovies().subscribe(
        movies => {
          expect(movies.length).toBeGreaterThan(0);
          done();
        }, error => {
          done.fail(error);
        }
      );
    });
  // });
});
