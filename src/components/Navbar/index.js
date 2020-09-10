import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from 'store/actions';
import useDebounce from 'helpers/useDebounce';

const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const debouncedMovieName = useDebounce(search, 500);
  const firstUpdate = useRef(true);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    scrollToTop();
    dispatch(searchMovies(debouncedMovieName));
  }, [debouncedMovieName, dispatch]);

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={scrollToTop}>
        MovieRama
      </div>
      <div className="navbar__search-container">
        <input
          className="navbar__searchbox"
          placeholder="Search for a movie"
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
