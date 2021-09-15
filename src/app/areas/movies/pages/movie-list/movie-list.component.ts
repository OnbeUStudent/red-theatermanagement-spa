import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/core/singleton-services/movies/movie';
import { take } from 'rxjs/operators';

import { MoviesCacheService } from '../../../../core/singleton-services/movies/movies-cache.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  providers: [MoviesCacheService]
})
export class MovieListComponent implements OnInit {
  private movies: Movie[] | undefined;

  constructor(
    private router: Router,
    private moviesCacheService: MoviesCacheService
  ) { }

  ngOnInit(): void {
    this.moviesCacheService.movies.subscribe(movies => {
      this.movies = movies;
      const initialJokes$ = this.getDataOnce(movies);
    });
  }

  private getDataOnce(movies: Movie[]): Observable<Movie[]> {
    return this.moviesCacheService.movies.pipe(take(1));
  }

  readMovies(): Observable<Movie[]> {
    if (this.movies === undefined) { return of([]); } // Not ready yet

    return this.moviesCacheService.movies;
  }

  book(monthId: string): void {
    this.router.navigate(['/bookings-create', monthId]);
  }
}
