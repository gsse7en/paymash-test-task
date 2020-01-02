import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public fetchMovies(): Movie[] {
    const movies = localStorage.getItem('dataSource');
    return movies !== null ? JSON.parse(movies) : undefined;
  }
  public setMovies(movies: Movie[]): void {
    localStorage.setItem('dataSource', JSON.stringify(movies));
  }
}
