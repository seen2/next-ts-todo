import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import isDBConnected from "../../../util/connectDB";
import { bcryptSaltRounds, jwtKey } from "../../../util/appconfig";
import User from '../../../models/User';

type Data = {
  msg: string,
  token: string | null,
  userId: string | null
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>

) {


  switch (req.method) {
    case 'POST': {
      try {
        const connected: boolean = await isDBConnected();
        console.log(connected);
        const { name, email, password } = req.body;
        if (name && email && password && connected) {
          bcrypt.genSalt(bcryptSaltRounds, function (err: any, bcryptSalt: string) {
            bcrypt.hash(password, bcryptSalt, async function (err: any, hash: string) {

              if (err) {
                throw new Error("Something Went wrong");
              }

              // Store hash in your password DB.
              try {
                const newUser = { name, email, password: hash };
                let result: any = await User.find({ email });
                if (!result.length) {
                  const usercreated = await new User(newUser);
                  const response = await usercreated.save();
                  result = response ? await User.find({ email }) : null;
                  const token: string | null = result.length ? jwt.sign({ user: { _id: result[0]._id, email: result[0].email } }, jwtKey) : null;
                  res.status(200).json({ msg: 'Success', token, userId: result[0]._id });
                } else {
                  throw new Error('User already Exist');
                }
              } catch (error: any) {
                console.log("Error Registering user:" + error.message);
                res.status(400).json({ msg: error.message, token: null, userId: null });



              }

            });
          });
        } else {
          throw new Error("Error Registering user");
        }
      } catch (error: any) {
        return res.status(400).json({ msg: error.message, token: null, userId: null });
      }
      break;
    }
    default:
      res.status(400).json({ msg: 'Invalid HTTP method', token: null, userId: null });

  }




}
