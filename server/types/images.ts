import { Photo } from 'pexels';

export interface GetImagesRequest {
  query: string;
  per_page: number;
}

export interface GetImagesResponse {
  ok: boolean;
  images: Photo[];
}
