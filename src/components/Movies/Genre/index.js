import React from 'react';
import { useSelector } from 'react-redux';

const Genre = ({ id }) => {
  const movieGenre = useSelector((state) =>
    state.genres.genres.find((genre) => genre.id === id)
  );

  return <div className="genre-pill">{movieGenre?.name}</div>;
};

export default Genre;
