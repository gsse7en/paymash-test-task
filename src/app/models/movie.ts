export interface Movie {
    id: number;
    poster: string;
    name: string;
    year: number;
    rating: number;
    genre: string;
    country?: string;
    director?: {
      name: string;
      link?: string;
    };
    isFavorite: boolean;
  }
