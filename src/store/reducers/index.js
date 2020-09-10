import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import genresReducer from "./genresReducer";

export default combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
});
