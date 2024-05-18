import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ error: 'Method not allowed' });
  // }

  // const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json({ error: 'Invalid email or password' });
  // }

  const encrypt = (arg: Record<string, any>): string => {
    return JSON.stringify(arg);
  };

  // TODO: Authenticate user
  const user = encrypt({
    email: 'abbas@test.com',
    name: 'abbas',
    id: '87',
  });

  const token = sign({ user }, 'superdupersecret', { expiresIn: '7d' });
  // res.setHeader(
  //   'Set-Cookie',
  //   `token=${token}; HttpOnly; Max-Age=604800; Path=/; SameSite=lax`,
  // );
  res.status(200).json({ message: 'Login successful', token });
}
