import { MovieMetadata } from "./MovieMetadata";

export class Movie {
  public movieId!: number;
  public title!: string;
  public movieMetadata: MovieMetadata | undefined;

  constructor(movieId: number, title: string){
    this.movieId = movieId;
    this.title = title;
  }
}
