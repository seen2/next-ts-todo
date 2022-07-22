import { TodoItem } from '../../types/todo';
import { setLoading, setMsg, setStatusCode } from '../reducers/authReducers';
import { addTodo, deleteTodo, getTodos, initialState, updateTodo } from '../reducers/todoReducer';
import { AppDispatch, store } from '../store';

export const onCreateTodo = (newTodo: TodoItem) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      //make network request to add
      if (window.localStorage.getItem("userAuthToken") && currentUser._id) {
        const res = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({
            ...newTodo
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + window.localStorage.getItem("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(addTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }

export const onDeleteTodo = (newTodo: TodoItem) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      const todoItem = { todoId: newTodo._id, title: newTodo.title, description: newTodo.description, isCompleted: newTodo.isCompleted }
      //make network request to add
      if (window.localStorage.getItem("userAuthToken") && currentUser._id) {
        const res = await fetch("/api/todos", {
          method: "DELETE",
          body: JSON.stringify({
            ...todoItem
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + window.localStorage.getItem("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(deleteTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }


export const onUpdateTodo = (newTodo: TodoItem) =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      const todoItem = { todoId: newTodo._id, title: newTodo.title, description: newTodo.description, isCompleted: newTodo.isCompleted }
      //make network request to add
      if (window.localStorage.getItem("userAuthToken") && currentUser._id) {
        const res = await fetch("/api/todos", {
          method: "PUT",
          body: JSON.stringify({
            ...todoItem
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + window.localStorage.getItem("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          dispatch(updateTodo(newTodo));

        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }


      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }


export const onGetTodos = () =>
  async (dispatch: AppDispatch, getState: typeof store.getState) => {

    try {
      //make network request to add
      dispatch(setLoading(true));
      const currentUser = getState().auth;
      if (window.localStorage.getItem("userAuthToken") && currentUser._id) {
        const res = await fetch("/api/todos", {
          method: "GET",
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-auth-token': "" + window.localStorage.getItem("userAuthToken")
          }
        })

        if (res.status === 200) {
          dispatch(setStatusCode(200));
          dispatch(setMsg("Success"));
          const { result } = await res.json() || [];
          dispatch(getTodos(result));
        } else {
          dispatch(setStatusCode(400));
          dispatch(setMsg("Unable to Save"));
          dispatch(getTodos([]));

        }
      } else {
        dispatch(setStatusCode(400));
        dispatch(setMsg("Please Login"));
      }

      //add todo in the redux store

    } catch (error: any) {
      alert(error.message);

    } finally {
      dispatch(setLoading(false));
    }

  }
