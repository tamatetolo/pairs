import { createClient } from 'pexels';

export const pexelsApi = createClient(process.env.PEXELS_ACCESS_KEY);
