import type { NextApiRequest, NextApiResponse } from 'next'
import authenticateUser from '../../../middleware/authenticateUser';
import User from '../../../models/User';
import isDBconnected from '../../../util/connectDB'

type Data = {
  userId: string | null,
  name: string | null,
  email: string | null,
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const connected: boolean = await isDBconnected();
  if (connected) {
    try {
      const { id } = req.query
      if (id === req.body.user._id) {
        const [dbUser] = await User.find({ _id: id });
        const user: Data = { name: dbUser.name || null, email: dbUser.email || null, userId: dbUser._id || null }
        res.status(200).json(user)
      } else {
        res.status(401).json({ name: null, email: null, userId: null })
      }
    } catch (error) {
      res.status(400).json({ name: null, email: null, userId: null })
    }
  } else {
    res.status(500).json({ name: null, email: null, userId: null })
  }


}

export default authenticateUser(handler);