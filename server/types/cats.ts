import { Random } from 'unsplash-js/dist/methods/photos/types';

export interface GetCatsRequest {
  count: number;
}

export interface GetCatsResponse {
  ok: boolean;
  images: Random[];
}
