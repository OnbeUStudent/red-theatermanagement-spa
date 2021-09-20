import { Movie } from "../movies/movie";

export class Booking {
    movieId!: number;
    movie: Movie;
    theaterCode: string;
    monthId!: number;

    constructor(movieId: number, movie: Movie, theaterCode: string, monthId: number){
        this.movieId = movieId;
        this.movie = movie;
        this.theaterCode = theaterCode;
        this.monthId = monthId;
      }
}