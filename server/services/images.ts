import { GetImagesRequest, GetImagesResponse } from '../types/images';
import { pexelsApi } from './../gateways/pexels';
import { PhotosWithTotalResults, ErrorResponse } from 'pexels';

export async function getImages(
  data: GetImagesRequest
): Promise<GetImagesResponse> {
  const call = await pexelsApi.photos.search({
    query: data.query,
    per_page: data.per_page,
  });

  const error = (call as ErrorResponse).error;
  if (error) {
    return {
      ok: false,
      images: [],
    };
  }
  const response = call as PhotosWithTotalResults;

  return {
    ok: true,
    images: response.photos,
  };
}
