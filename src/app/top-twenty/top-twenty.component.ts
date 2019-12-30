import { Component, OnInit } from '@angular/core';

export interface Movie {
  id: number;
  poster: string;
  name: string;
  year: number;
  rating: number;
  genre: string;
  country: string;
  director: {
    name: string;
    link: string;
  };
  isFavorite: boolean;
}

const ELEMENT_DATA: Movie[] = [
  {
    id: 1,
    poster: 'img',
    name: 'name1',
    year: 1991,
    rating: 4.5,
    genre: 'comedy',
    country: 'Germany',
    director: {
      name: 'Kim Ki Duk',
      link: '1'
    },
    isFavorite: false
  },
  {
    id: 2,
    poster: 'img',
    name: 'name2',
    year: 2991,
    rating: 3.5,
    genre: 'comedy',
    country: 'Germany',
    director: {
      name: 'Kim Ki Duk',
      link: '2'
    },
    isFavorite: false
  }
];

@Component({
  selector: 'app-top-twenty',
  templateUrl: './top-twenty.component.html',
  styleUrls: ['./top-twenty.component.scss']
})
export class TopTwentyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'poster', 'name', 'year', 'rating', 'genre', 'country', 'director', 'favorite'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
