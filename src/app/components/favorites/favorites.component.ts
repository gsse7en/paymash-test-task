import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['id', 'poster', 'name', 'year', 'rating', 'genre', 'country', 'director', 'favorite'];
  public dataSource = new MatTableDataSource<Movie>([]);
  public movieList: Movie[] = [];
  private unsubscribe: Subject<void> = new Subject();
  constructor(private movies: MoviesService) { }

  ngOnInit() {
    this.movies.movies$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.movieList = res;
      this.dataSource.data = this.movieList.filter(el => el.isFavorite);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  toggleFavorite(element: Movie): void {
    const data = this.movieList.map(el => {
      if (el.id === element.id) {
        el.isFavorite = !el.isFavorite;
      }
      return el;
    });
    this.movies.setMovies(data);
  }

}

