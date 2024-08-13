import type { NextApiRequest, NextApiResponse } from 'next';
import { getImages } from './../../server/services/images';
import { GetImagesRequest } from '../../server/types/images';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const data = { ...req.body } as GetImagesRequest;
    const response = await getImages(data);
    res.status(201).json({ ok: true, images: response.images });
  } catch (e) {
    res.status(500).json({ ok: false, message: 'Oops it failed' });
  }
};

export default handler;
