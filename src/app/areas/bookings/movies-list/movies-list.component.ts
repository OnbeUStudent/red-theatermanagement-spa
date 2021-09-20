import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core/singleton-services/movies/movie';
import { MoviesCacheService } from 'src/app/core/singleton-services/movies/movies-cache.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  providers: [MoviesCacheService]
})
export class MoviesListComponent implements OnInit {
  @Output() onMovieSelected: EventEmitter<any> = new EventEmitter();
  private movies: Movie[] | undefined;
  private selectedMovie: Movie | undefined;

  constructor(
    private moviesCacheService: MoviesCacheService
  ) {
    
   }

  ngOnInit(): void {
    this.moviesCacheService.movies.subscribe(movies => {
      this.movies = movies;
      this.selectedMovie = movies[0];
      this.onMovieSelected.emit(this.selectedMovie);
    });
  }

  get getMovies() {
    return this.movies;
  }

  get getSelectedMovie() {
    return this.selectedMovie;
  }

  handleMovieSelected() {
    const selectedMovieId = Number((<HTMLInputElement>document.getElementById("movies")).value);
    this.selectedMovie = this.movies?.find((movie) => movie.movieId === selectedMovieId);
    this.onMovieSelected.emit(this.selectedMovie);
  }

}
