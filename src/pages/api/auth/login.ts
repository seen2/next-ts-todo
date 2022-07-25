import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwtKey } from "../../../util/appconfig";
import User from '../../../models/User';
import isDBConnected from "../../../util/connectDB";

type Data = {
  msg: string,
  token: string | null,
  userId: string | null,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>

) {

  try {
    switch (req.method) {
      case 'POST': {
        const connected: boolean = await isDBConnected();
        console.log(connected);
        const { email, password } = req.body;
        if (email && password && connected) {
          try {
            let result: any = await User.find({ email });
            const validPassword: boolean = result.length >= 1 ? await bcrypt.compare(password, result[0].password) : false;

            if (result.length && validPassword) {
              const token: string = jwt.sign({ user: { _id: result[0]._id, email: result[0].email } }, jwtKey, { expiresIn: 24 * 3600 });
              res.status(200).json({ msg: 'Success', token, userId: result[0]._id });
            } else {
              if (result.length !== 1) {
                res.status(400).json({ msg: 'User Not found', token: null, userId: null });
              } else if (!validPassword) {
                res.status(400).json({ msg: 'Wrong Password', token: null, userId: null });
              } else {
                res.status(400).json({ msg: 'Something went wrong', token: null, userId: null });
              }
            }
          } catch (error: any) {
            console.log("Error Registering user:" + error.message);
            res.status(400).json({ msg: 'Something went wrong', token: null, userId: null });
          }
        } else {
          res.status(400).json({ msg: 'Email and Password is required', token: null, userId: null });
        }
        break;
      }
      default:
        res.status(400).json({ msg: 'Invalid HTTP method', token: null, userId: null });
    }

  } catch (error: any) {
    console.log("Login Errror:" + error.message);
    res.status(500).json({ msg: 'Internal Server Error', token: null, userId: null });

  }


}
