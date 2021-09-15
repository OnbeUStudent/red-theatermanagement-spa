// Provides a cached list of Movies.
// Follows technique from https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html

import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { Movie } from './movie';
import { BackendService } from '../backend/backend.service';

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class MoviesCacheService {
  private cache$: any;
  private reload$ = new Subject<void>();

  constructor(
    private backendService: BackendService
  ) { }

  get movies(): Observable<Movie[]> {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(() => this.requestMovies()),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  forceReload(): void {
    // Calling next will complete the current cache instance
    this.reload$.next();

    // Setting the cache to null will create a new cache the
    // next time 'movies()' is called
    this.cache$ = null;
  }

  private requestMovies(): Observable<Movie[]> {
    return this.backendService.getMovies();
  }
}
