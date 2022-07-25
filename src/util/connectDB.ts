import { connect } from 'mongoose';

import { uri } from "./appconfig";
export default async function isDBconnected() {
  let connected: boolean = false;
  try {
    const response = await connect(uri, {
      socketTimeoutMS: 45000,
    });
    response && console.log("Connected to DB");
    connected = true;
  } catch (error: any) {
    console.log(error.message);
    console.log("DB connection error");
  }
  return connected;

}