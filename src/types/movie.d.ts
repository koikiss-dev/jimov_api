
/*
 *
 *Specifies fields that has a movie, as rating or genres 
 * to that movie.
 * 
 * @author Mawfyy
 */

export interface IMovie {
  title?: String,
  originalTitle: String,
  dateReleased: String,
  durationInSeconds: number | String,
  description?: String,
  url: String,
  urlTrailer?: String
  genre?: String[]
  rating?: number,
  animeNameRelated?: String
  cast?: {
    directors?: String[]
    writes?: String[]
    actors?: String[]
  }
}


export class Movie {

  movie: IMovie;

  getMovie(): IMovie

}

