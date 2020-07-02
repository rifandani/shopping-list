import axios from 'axios';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// pakai middleware, ketika ada action getItems, sebelum action jalan ke reducers, midleware menjalankan fungsinya dulu sampai selesai, lalu action kembali jalan ke reducers
// jalankan fungsi setItemsLoading, lalu lakukan GET REQUEST dengan BASE URL proxy dari package.json
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status)),
    );
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status)),
    );
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      }),
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status)),
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
