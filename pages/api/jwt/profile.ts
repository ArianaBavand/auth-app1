import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const resp = verify(token, 'superdupersecret');
    // const data = await user.findOne({email: req.user.email}, {name:1, city:1});
    return res.status(200).json({});
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
