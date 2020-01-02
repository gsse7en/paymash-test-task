import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiClient: ApiClientService;
  private moviesSubject$: Subject<Movie[]> = new Subject();
  public readonly movies$: Observable<Movie[]> = this.moviesSubject$.asObservable();

  constructor(apiClient: ApiClientService) {
    this.apiClient = apiClient;
    this.fetchMovies();
  }

  private formatMovies(moviesToFormat, genres): Movie[] {
    return moviesToFormat.map(el => {
      return {
        id: el.id,
        poster: environment.api.poster_path + el.poster_path,
        name: el.title,
        year: el.release_date,
        rating: el.vote_average,
        genre: el.genre_ids.map(genreEl => genres.find(genreMapEl => genreMapEl.id === genreEl).name).join(', '),
        isFavorite: false
      };
    });
  }

  public async fetchMovies(): Promise<void> {
    try {
      const movies = await this.apiClient.get<any>({url: environment.api.url, params: environment.api.params});
      const genres = await this.apiClient.get<any>({url: environment.api.genres_url, params: environment.api.genres_params});
      this.moviesSubject$.next(this.formatMovies(movies.results, genres.genres));
    } catch (error) {
      console.error(error);
    }
  }
}
