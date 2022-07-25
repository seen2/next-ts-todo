// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  
  res.status(200).json({ name: 'John Doe' });
}

export const environmentVariables:{uri:string ,jwtKey:string,bcryptSaltRounds:number |string}={
  uri:process.env.DB_URI ||"",
  jwtKey:process.env.JWT_KEY || "",
  bcryptSaltRounds:process.env.BCRYPT_SALT_ROUNDS || 0

};