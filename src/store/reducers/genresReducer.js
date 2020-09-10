import * as actionTypes from '../actions/actionTypes';

const initialState = {
  genres: [],
  loading: false,
  error: null,
  loaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENRES_FETCH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_GENRES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        genres: action.genres,
        loaded: true
      };

    case actionTypes.GET_GENRES_FETCH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
