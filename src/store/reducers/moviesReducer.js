import * as actionTypes from '../actions/actionTypes';

const initialState = {
  movies: [],
  searchResults: [],
  searchTerm: '',
  selectedMovieId: '',
  loading: false,
  loaded: false,
  error: null,
  byId: {},
  ids: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIES_FETCH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_MOVIES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        movies: [...state.movies, ...action.movies]
      };
    case actionTypes.GET_MOVIES_FETCH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: true
      };
    case actionTypes.SEARCH_MOVIES_FETCH_SUCCESS:
      const searchResults = action.movieName
        ? action.movieName === state.searchTerm
          ? [...state.searchResults, ...action.searchResults] // User is infinite scrolling
          : action.searchResults // User typed another search input
        : []; // Default state
      return {
        ...state,
        loading: false,
        searchResults,
        searchTerm: action.movieName
      };
    case actionTypes.GET_MOVIE_VIDEO:
      return {
        ...state,
        ids: [...state.ids, action.id],
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            videos: action.videos,
            videoLoaded: true
          }
        }
      };
    case actionTypes.GET_MOVIE_REVIEWS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: { ...state.byId[action.id], reviews: action.reviews }
        }
      };
    case actionTypes.GET_SIMILAR_MOVIES:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: { ...state.byId[action.id], similar: action.similar }
        }
      };
    case actionTypes.SET_SELECTEDMOVIE_ID:
      return {
        ...state,
        selectedMovieId: action.selectedMovieId
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
