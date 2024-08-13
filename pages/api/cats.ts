import type { NextApiRequest, NextApiResponse } from 'next';
import { getCats } from './../../server/services/cats';
import { GetCatsRequest } from '../../server/types/cats';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const data = { ...req.body } as GetCatsRequest;
    const response = await getCats(data);
    res.status(201).json({ ok: true, images: response.images });
  } catch (e) {
    res.status(500).json({ ok: false, message: 'Oops it failed' });
  }
};

export default handler;
