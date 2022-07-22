import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from "jsonwebtoken";

import { jwtKey } from "../util/appconfig.json";

const authenticateUser = (handler: Function): Function => (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  try {
    const token: string = typeof (req.headers['x-auth-token']) === 'string' ? req.headers['x-auth-token'] : "";

    const decoded: any = token ? jwt.verify(token, jwtKey) : null;
    // console.log("decoded: ", decoded);
    req.body.user = decoded !== null ? decoded["user"] : null;
    console.log(req.body.user);
    return handler(req, res);
  } catch (error: any) {
    console.log("Auth Error:", error.message);
    res.status(401).json({ msg: "Unauthorized", token: null })
    return (async () => { })();
  }


}

export default authenticateUser;