import axios from 'axios';
import * as actionTypes from './actionTypes';
import { apiUrl, headers } from 'config';

export const getMoviesFetchStart = () => {
  return {
    type: actionTypes.GET_MOVIES_FETCH_START
  };
};

export const getMoviesFetchSuccess = (movies) => {
  return {
    type: actionTypes.GET_MOVIES_FETCH_SUCCESS,
    movies
  };
};

export const searchMoviesFetchSuccess = (movieName, searchResults) => {
  return {
    type: actionTypes.SEARCH_MOVIES_FETCH_SUCCESS,
    searchResults,
    movieName
  };
};

export const getMoviesFetchFail = (error) => {
  return {
    type: actionTypes.GET_MOVIES_FETCH_FAIL,
    error
  };
};

export const getMovies = (page) => {
  return async (dispatch) => {
    dispatch(getMoviesFetchStart());
    try {
      const result = await axios.get(
        apiUrl +
          `/movie/now_playing?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: headers()
        }
      );
      dispatch(getMoviesFetchSuccess(result.data.results));
      return result.data.results;
    } catch (error) {
      dispatch(getMoviesFetchFail(error.response));
      return error.response;
    }
  };
};

export const searchMovies = (movieName, page) => {
  return async (dispatch) => {
    dispatch(getMoviesFetchStart());
    if (movieName) {
      try {
        const result = await axios.get(
          apiUrl +
            `/search/movie?query=${movieName}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`,
          {
            headers: headers()
          }
        );

        dispatch(searchMoviesFetchSuccess(movieName, result.data.results));
        return result.data.results;
      } catch (error) {
        dispatch(getMoviesFetchFail(error.response));
        return error.response;
      }
    } else {
      dispatch(searchMoviesFetchSuccess('', []));
    }
  };
};

export const getMovieVideo = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        apiUrl + `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: headers()
        }
      );
      dispatch({
        type: actionTypes.GET_MOVIE_VIDEO,
        id,
        videos: result.data.results
      });
      return result.data.results;
    } catch (error) {
      return error.response;
    }
  };
};

export const getSimilarMovies = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        apiUrl +
          `/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: headers()
        }
      );
      dispatch({
        type: actionTypes.GET_SIMILAR_MOVIES,
        id,
        similar: result.data.results
      });
      return result.data.results;
    } catch (error) {
      return error.response;
    }
  };
};

export const getMovieReviews = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        apiUrl +
          `/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          headers: headers()
        }
      );
      dispatch({
        type: actionTypes.GET_MOVIE_REVIEWS,
        id,
        reviews: result.data.results
      });
      return result.data.results;
    } catch (error) {
      return error.response;
    }
  };
};

export const setSelectedMovieId = (selectedMovieId) => {
  return {
    type: actionTypes.SET_SELECTEDMOVIE_ID,
    selectedMovieId
  };
};
