import React from 'react';
import Genre from '../Genre';

const placeholderImage =
  'https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/ke17ZwdGBToddI8pDm48kJme_vyRngthM-lqQfhlIH1Zw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHgWyuYKVyGKE-9HoVq2NUPJx1jqOlAvv7NferAwL6AaCb8BodarTVrzIWCp72ioWw/placeholder-image-vertical.png';

const Similar = ({
  title,
  overview,
  relaseDate,
  posterPath,
  voteAverage,
  genreIds = []
}) => {
  const poster = posterPath
    ? `https://image.tmdb.org/t/p/w300` + posterPath
    : placeholderImage;

  return (
    <>
      <div className="movie-card">
        <div className="movie-card__ribbon">
          <span> {new Date(relaseDate).getFullYear()}</span>
        </div>
        <div className="movie-card__cover">
          <img src={poster} alt={title} className="movie-card__image" />
        </div>

        <div className="movie-card__genres">
          {genreIds.map((id) => {
            return <Genre key={id} id={id} />;
          })}
        </div>

        <div className="movie-card__summary">
          <div className="movie-card__summary-upper">
            <h4 className="movie-card__title">{title}</h4>
            <span className="fa fa-star checked" />
            <p>{voteAverage}/10</p>
          </div>

          <div className="movie-card__summary-lower">
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Similar;
