import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User';
import isDBconnected from '../../../util/connectDB'

type Data = {
  names: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const connected: boolean = await isDBconnected();
  if (connected) {

    const users = await User.find();
    const names = users.map(user => user.name);


    res.status(200).json({ names })
  }


}
