export interface ImagesList {
  id: string;
  title: string;
  duration: string;
  budget: string;
  release_date: string;
}

export interface Image extends ImagesList {
  box_office: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
