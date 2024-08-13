import { createApi } from 'unsplash-js';

export const unsplahApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});
