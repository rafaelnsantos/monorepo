type Status =
  | "Running"
  | "In Development"
  | "Ended"
  | "Canceled/Ended"
  | "Returning Series"
  | "New Series"
  | "To Be Determined"
  | "TBD/On The Bubble";

export interface SearchTvShow {
  id: number;
  name: string;
  permalink: string;
  start_date?: string;
  end_date: string | null;
  country: string;
  network: string;
  status: Status;
  image_thumbnail_path: string;
}

export interface SearchRoot {
  total: string;
  page: number;
  pages: number;
  tv_shows: SearchTvShow[];
}

export interface DetailRoot {
  tvShow: DetailTvShow;
}

export interface DetailTvShow {
  id: number;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: any;
  start_date: string;
  end_date: any;
  country: string;
  status: Status;
  runtime: number;
  network: string;
  youtube_link: string | null;
  image_path: string;
  image_thumbnail_path: string;
  rating: string | number;
  rating_count: string;
  countdown: Countdown | null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}

export interface Countdown {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

export interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}
