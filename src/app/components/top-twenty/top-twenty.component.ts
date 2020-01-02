import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-top-twenty',
  templateUrl: './top-twenty.component.html',
  styleUrls: ['./top-twenty.component.scss']
})
export class TopTwentyComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['id', 'poster', 'name', 'year', 'rating', 'genre', 'country', 'director', 'favorite'];
  public dataSource: Movie[];
  private unsubscribe: Subject<void> = new Subject();
  constructor(private movies: MoviesService) { }

  ngOnInit() {
    this.movies.movies$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
