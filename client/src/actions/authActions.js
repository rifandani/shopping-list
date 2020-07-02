import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types';

// check Token and load USER
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  // fetch user
  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));

      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// register user
export const register = ({ name, email, password }) => (dispatch) => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // req body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );

      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// login user
export const login = ({ email, password }) => (dispatch) => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // req body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      }),
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );

      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// set up config / headers and token
export const tokenConfig = (getState) => {
  // get Token from localStorage
  const token = getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // if token exists, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
