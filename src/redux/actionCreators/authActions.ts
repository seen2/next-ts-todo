import { login, logout, setLoading } from '../reducers/authReducers'
import { getTodos } from '../reducers/todoReducer';
import { AppDispatch, store } from '../store'

export const onLogin = () =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      dispatch(setLoading(true));
      const { email, password } = getState().auth;
      //async code

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }

      });
      let { msg, token, userId } = await res.json();
      if (res.status === 200) {
        window.localStorage.setItem("userAuthToken", token);
        const getUserRes = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': window.localStorage.getItem("userAuthToken") + ""
          }
        });

        let { name } = await getUserRes.json();
        if (getUserRes.status === 200) {
          dispatch(login({ name: name || null, email: email || null, password: "", loading: false, _id: userId || null, msg: msg, statusCode: getUserRes.status }));

        }

      } else {
        dispatch(login({ name: "", email, password, loading: false, _id: null, msg: msg || null, statusCode: res.status }));

      }


    } catch (error: any) {
      console.log("...error", error.message);
    } finally {
      dispatch(setLoading(false));
    }

  }


export const onRegister = () =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      dispatch(setLoading(true));
      //async code
      const { email, password } = getState().auth;
      const userName = getState().auth.name;

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: userName, email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }

      });
      const { msg, token, userId } = await res.json();
      if (res.status === 200) {
        window.localStorage.setItem("userAuthToken", token);
        const getUserRes = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': window.localStorage.getItem("userAuthToken") + ""
          }
        });

        if (getUserRes.status === 200) {
          let { name } = await getUserRes.json();
          dispatch(login({ name: name || null, email: email || null, password: "", loading: false, _id: userId || null, msg: null, statusCode: res.status }));

        }

      } else {
        dispatch(login({ name: "", email, password, loading: false, _id: null, msg: msg || null, statusCode: res.status }));
      }



    } catch (error) {

    } finally {
      dispatch(setLoading(false));
    }

  }


export const onLogout = () =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      window.localStorage.removeItem("userAuthToken");
      dispatch(getTodos([]));
      dispatch(logout({}));

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }

