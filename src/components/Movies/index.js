import React, { useState, useEffect } from 'react';
import MovieItem from './MovieItem';
import Modal from 'components/Modal';

const Movies = ({ movies }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
  }, [modalOpen]);

  return (
    <div className="container movie-list" onClick={handleClose}>
      {movies.map((movie, index) => {
        return (
          <MovieItem
            key={movie.id + '-' + index}
            title={movie.title}
            overview={movie.overview}
            relaseDate={movie.release_date}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            genreIds={movie.genre_ids}
            openModal={handleOpen}
            id={movie.id}
          />
        );
      })}
      {modalOpen && (
        <Modal
          open={modalOpen}
          openModal={handleOpen}
          closeModal={handleClose}
        />
      )}
    </div>
  );
};

export default Movies;
