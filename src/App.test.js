import React from 'react';
import rootReducer from './store/reducers';
import { renderHook } from '@testing-library/react-hooks';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
import * as actionTypes from './store/actions/actionTypes';
import {
  setSelectedMovieId,
  getGenres,
  getMovies,
  getGenresFetchSuccess,
  getGenresFetchStart,
  getGenresFetchFail,
  getMoviesFetchSuccess,
  getMoviesFetchStart,
  getMoviesFetchFail,
  searchMoviesFetchSuccess
} from './store/actions';

const middleware = [thunk];

const makeReduxStore = (initialState) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );

const makeStoreProvider = (store) => ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

const renderHookWithStore = (hook, initialState) => {
  const store = makeReduxStore(initialState);
  const storeProvider = makeStoreProvider(store);
  renderHook(hook, {
    wrapper: storeProvider
  });

  return store;
};

// ### Redux Funcionality Tests ###

it('Sets the selected movie id properly', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(setSelectedMovieId(11));
  });

  expect(store.getState().movies.selectedMovieId).toEqual(11);
});

it('Starts loading when the genres action is called', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getGenres());
  });

  expect(store.getState().genres.loading).toEqual(true);
});

it('Has proper loading behavior on getMovies request', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getMovies());
  });

  expect(store.getState().movies.loading).toEqual(true);
});

it('Fetches properly after a search request and saves the information in redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(
      searchMoviesFetchSuccess('Iron man', [
        { id: 1, title: 'Iron man 1' },
        { id: 2, title: 'Iron man 2' }
      ])
    );
  });

  expect(store.getState().movies.searchResults).toEqual([
    { id: 1, title: 'Iron man 1' },
    { id: 2, title: 'Iron man 2' }
  ]);
  expect(store.getState().movies.searchTerm).toEqual('Iron man');
  expect(store.getState().movies.movies).toEqual([]);
  expect(store.getState().movies.loading).toEqual(false);
});

it('Fetches properly after a get now playing movies and saves the information in redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(
      getMoviesFetchSuccess([
        { id: 1, title: 'Batman' },
        { id: 2, title: 'Spiderman' }
      ])
    );
  });

  expect(store.getState().movies.searchResults).toEqual([]);
  expect(store.getState().movies.movies).toEqual([
    { id: 1, title: 'Batman' },
    { id: 2, title: 'Spiderman' }
  ]);
  expect(store.getState().movies.loading).toEqual(false);
  expect(store.getState().movies.loaded).toEqual(true);
});

it('Fetches properly the genres and saves the information in redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(
      getGenresFetchSuccess([
        { id: 1, name: 'Action' },
        { id: 2, name: 'Romance' }
      ])
    );
  });

  expect(store.getState().genres.genres).toEqual([
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romance' }
  ]);
  expect(store.getState().genres.loading).toEqual(false);
  expect(store.getState().movies.loaded).toEqual(false);
});

it('Starts loading of the genres', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getGenresFetchStart());
  });

  expect(store.getState().genres.genres).toEqual([]);
  expect(store.getState().genres.loading).toEqual(true);
  expect(store.getState().movies.loaded).toEqual(false);
});

it('Ends loading of the genres with an error', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getGenresFetchFail('error, try again later'));
  });

  expect(store.getState().genres.genres).toEqual([]);
  expect(store.getState().genres.error).toEqual('error, try again later');
  expect(store.getState().genres.loading).toEqual(false);
  expect(store.getState().movies.loaded).toEqual(false);
});

it('Starts loading of the movies', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getMoviesFetchStart());
  });

  expect(store.getState().movies.movies).toEqual([]);
  expect(store.getState().movies.loading).toEqual(true);
  expect(store.getState().movies.loaded).toEqual(false);
});

it('Ends loading of the movies with an error', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch(getMoviesFetchFail('error, try again later'));
  });

  expect(store.getState().movies.movies).toEqual([]);
  expect(store.getState().movies.error).toEqual('error, try again later');
  expect(store.getState().movies.loading).toEqual(false);
  expect(store.getState().movies.loaded).toEqual(false);
});

it('Updates the correct resource in similar movies in the redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch({
      type: actionTypes.GET_SIMILAR_MOVIES,
      id: 14,
      similar: [
        { id: 1, title: 'Avengers' },
        { id: 2, title: 'Captain America' }
      ]
    });
  });

  expect(store.getState().movies.byId[14].similar).toEqual([
    { id: 1, title: 'Avengers' },
    { id: 2, title: 'Captain America' }
  ]);
});

it('Updates the correct resource in movie videos in the redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch({
      type: actionTypes.GET_MOVIE_VIDEO,
      id: 11,
      videos: [
        { id: 1, key: '13sfda2r42' },
        { id: 2, title: 'zdxfvg42' }
      ]
    });
  });

  expect(store.getState().movies.byId[11].videos).toEqual([
    { id: 1, key: '13sfda2r42' },
    { id: 2, title: 'zdxfvg42' }
  ]);
  expect(store.getState().movies.byId[11].videoLoaded).toEqual(true);
});

it('Updates the correct resource in movie Reviews in the redux store', () => {
  const store = renderHookWithStore(() => {
    const dispatch = useDispatch();
    dispatch({
      type: actionTypes.GET_MOVIE_REVIEWS,
      id: 2645,
      reviews: [
        {
          id: 1,
          author: 'Thanos Tsavlis',
          content: 'Awesome movie, totaly loved it'
        }
      ]
    });
  });

  expect(store.getState().movies.byId[2645].reviews).toEqual([
    {
      id: 1,
      author: 'Thanos Tsavlis',
      content: 'Awesome movie, totaly loved it'
    }
  ]);
});
