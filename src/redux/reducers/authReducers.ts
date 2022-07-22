import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from "../../types/auth";

const initialState: User = {
  name: "",
  email: "",
  password: "",
  _id: "",
  loading: false,
  msg: "",
  statusCode: 0
}

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    nameChange: (state: User, action: PayloadAction<string>) => ({
      ...state, name: action.payload
    }),
    emailChange: (state: User, action: PayloadAction<string>) => ({
      ...state, email: action.payload
    }),
    passwordChange: (state: User, action) => ({
      ...state, password: action.payload
    }),
    setLoading: (state: User, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    }),
    setStatusCode: (state: User, action: PayloadAction<number>) => ({
      ...state, statusCode: action.payload
    }),
    setMsg: (state: User, action: PayloadAction<string>) => ({
      ...state, msg: action.payload
    }),
    login: (state: User, action: PayloadAction<User>) => {

      return { ...state, ...action.payload }

    },
    logout: (state: User, action: PayloadAction<any>) => ({ ...initialState })

  },



});



export const { nameChange, emailChange, passwordChange, login, logout, setLoading, setStatusCode, setMsg } = authSlice.actions;

export default authSlice.reducer;
