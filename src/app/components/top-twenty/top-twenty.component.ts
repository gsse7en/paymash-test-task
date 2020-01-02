import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { environment } from '../../../environments/environment';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-top-twenty',
  templateUrl: './top-twenty.component.html',
  styleUrls: ['./top-twenty.component.scss']
})
export class TopTwentyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'poster', 'name', 'year', 'rating', 'genre', 'country', 'director', 'favorite'];
  dataSource: Movie[];
  constructor(private movies: MoviesService) { }

  ngOnInit() {
    this.movies.movies$.subscribe(res => this.dataSource = res);
  }

}
