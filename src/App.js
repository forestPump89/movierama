import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getMovies, searchMovies } from './store/actions';
import useInfiniteScroll from './helpers/useInfiniteScroll';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Spinner from './components/Spinner';
import Movies from './components/Movies';

const App = () => {
  const [page, setPage] = useState(1);
  const moviesLoaded = useSelector((state) => state.movies.loaded);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const movies = useSelector((state) => state.movies.movies);
  const error = useSelector((state) => state.movies.error);
  const dispatch = useDispatch();

  const loadMoreMovies = useCallback(() => {
    if (searchResults.length > 0) {
      dispatch(searchMovies(searchTerm, page + 1));
    } else {
      dispatch(getMovies(page + 1));
    }

    setIsFetching(false);
    setPage(page + 1);
  }, [searchResults]);

  const [isFetching, setIsFetching] = useInfiniteScroll(loadMoreMovies);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getMovies(1));
  }, [dispatch]);

  if (error) {
    return (
      <div>
        Ops!Something went wrong! Check your Api Key and your network connection
        and try again later!
      </div>
    );
  }

  if (!movies.length > 0 || !moviesLoaded) {
    return <Spinner />;
  }

  return (
    <Layout>
      <Navbar />
      {movies && (
        <Movies movies={searchResults.length > 0 ? searchResults : movies} />
      )}
    </Layout>
  );
};

export default App;
