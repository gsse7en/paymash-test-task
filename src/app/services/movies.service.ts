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

  private formatMovies(moviesToFormat): Movie[] {
    return moviesToFormat.map(el => {
      return {
        id: el.id,
        poster: environment.api.poster_path + el.poster_path,
        name: el.title,
        year: el.release_date,
        rating: el.vote_average,
        genre: el.genre_ids.join(),
        isFavorite: false
      };
    });
  }

  public async fetchMovies(): Promise<void> {
    try {
      const movies = await this.apiClient.get<any>({url: environment.api.url, params: environment.api.params});
      console.log(movies);
      this.moviesSubject$.next(this.formatMovies(movies.results));
    } catch (error) {
      console.error(error);
    }
  }
}
