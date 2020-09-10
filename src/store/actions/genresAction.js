import axios from 'axios';
import * as actionTypes from './actionTypes';
import { apiUrl, headers } from 'config';

export const getGenresFetchStart = () => {
  return {
    type: actionTypes.GET_GENRES_FETCH_START
  };
};

export const getGenresFetchSuccess = (genres) => {
  return {
    type: actionTypes.GET_GENRES_FETCH_SUCCESS,
    genres
  };
};

export const getGenresFetchFail = (error) => {
  return {
    type: actionTypes.GET_GENRES_FETCH_FAIL,
    error
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    dispatch(getGenresFetchStart());
    try {
      const result = await axios.get(
        apiUrl + `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: headers()
        }
      );
      dispatch(getGenresFetchSuccess(result.data.genres));
      return result.data;
    } catch (error) {
      dispatch(getGenresFetchFail(error.response));
      return error.response;
    }
  };
};
