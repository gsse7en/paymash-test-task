import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesSubject$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);
  public readonly movies$: Observable<Movie[]> = this.moviesSubject$.asObservable();

  constructor(
    private apiClient: ApiClientService,
    private storageService: StorageService) {
      this.fetchMovies();
  }

  private formatMovies(moviesToFormat, genres): Movie[] {
    return moviesToFormat.map(el => {
      return {
        id: el.id,
        poster: environment.api.poster_path + el.poster_path,
        name: el.title,
        year: +el.release_date.slice(0, 4),
        rating: el.vote_average,
        genre: el.genre_ids.map(genreEl => genres.find(genreMapEl => genreMapEl.id === genreEl).name).join(', '),
        isFavorite: false
      };
    });
  }

  public async fetchMovies(): Promise<void> {
    const localMovies = this.storageService.fetchMovies();
    if (localMovies) {
      setTimeout(() => this.moviesSubject$.next(localMovies));
      return;
    }
    try {
      const apiMovies = await this.apiClient.get<any>({ url: environment.api.url, params: environment.api.params });
      const genres = await this.apiClient.get<any>({ url: environment.api.genres_url, params: environment.api.genres_params });
      const movies = this.formatMovies(apiMovies.results, genres.genres);
      this.moviesSubject$.next(movies);
      this.storageService.setMovies(movies);
    } catch (error) {
      console.error(error);
    }
  }
}
