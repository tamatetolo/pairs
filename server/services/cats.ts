import { GetCatsRequest, GetCatsResponse } from '../types/cats';
import { unsplahApi } from './../gateways/unsplash';
import { Random } from 'unsplash-js/dist/methods/photos/types';

export async function getCats(data: GetCatsRequest): Promise<GetCatsResponse> {
  const call = await unsplahApi.photos.getRandom({ count: data.count });

  console.debug({ call });
  if (call.errors) {
  }

  return {
    ok: !call.errors,
    images: call.response as Random[],
  };
}
