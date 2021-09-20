import { MovieMetadata } from "./MovieMetadata";

export class Movie {
  public movieId!: string;
  public title!: string;
  public movieMetadata: MovieMetadata | undefined;

  constructor(movieId: string, title: string){
    this.movieId = movieId;
    this.title = title;
  }
}
