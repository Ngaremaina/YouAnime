export type Animation = {
  id: number;
  title: string;
  plot: string;
  year: string;
  cover: string;
  type: string;
  video_link: string;
  directors_id: number;
  genres_id: number;
};

export type AnimationInput = {
  title: string;
  plot: string;
  year: string;
  cover: string;
  type: string;
  video_link: string;
  directors_id: number;
  genres_id: number;
};

export type Director = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
};

export type ApiError = {
  detail: string | { msg: string }[];
};
