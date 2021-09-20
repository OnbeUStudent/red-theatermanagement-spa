import { Movie } from "../movies/movie";

export class Booking {
    movieId!: string;
    movie: Movie;
    theaterCode: string;
    monthId!: number;

    constructor(movieId: string, movie: Movie, theaterCode: string, monthId: number){
        this.movieId = movieId;
        this.movie = movie;
        this.theaterCode = theaterCode;
        this.monthId = monthId;
      }
}
