import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import Review from '../Review';
import Similar from '../Movies/Similar';

const Modal = () => {
  const [similarShown, setSimilarShown] = useState(false);
  const selectedMovieId = useSelector((state) => state.movies.selectedMovieId);
  const similarMovies = useSelector(
    (state) => state.movies.byId[selectedMovieId]?.similar
  );
  const videoLoaded = useSelector(
    (state) => state.movies.byId[selectedMovieId]?.videoLoaded
  );
  const videos = useSelector(
    (state) => state.movies.byId[selectedMovieId]?.videos
  );
  const reviews = useSelector(
    (state) => state.movies.byId[selectedMovieId]?.reviews
  );
  const youtubeVideo = videos?.find(
    (video) =>
      video.type.toLowerCase() === 'trailer' &&
      video.site.toLowerCase() === 'youtube' &&
      video.key
  );

  const toggleSimilar = () => {
    setSimilarShown(!similarShown);
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {similarMovies?.length > 0 && (
        <button className="btn" onClick={toggleSimilar}>
          {similarShown ? 'Overview' : 'Similar movies'}
        </button>
      )}
      {similarShown ? (
        similarMovies && (
          <div className="modal__similar">
            {similarMovies.map(
              ({
                id,
                title,
                overview,
                release_date,
                genre_ids,
                poster_path,
                vote_average
              }) => {
                return (
                  <Similar
                    key={id}
                    title={title}
                    overview={overview}
                    relaseDate={release_date}
                    posterPath={poster_path}
                    voteAverage={vote_average}
                    genreIds={genre_ids}
                  />
                );
              }
            )}
          </div>
        )
      ) : (
        <>
          {!videoLoaded && <Spinner />}
          {videoLoaded && videos.length === 0 && (
            <p className="modal__error">No matching Trailer for this movie!</p>
          )}
          {youtubeVideo && (
            <iframe
              type="text/html"
              className="modal__iframe"
              src={`https://www.youtube.com/embed/${youtubeVideo.key}?autoplay=1`}
              frameBorder="0"
              allow="autoplay;"
              allowFullScreen
              title="youtube-video"
            />
          )}
          {reviews && (
            <div className="modal__reviews">
              {reviews.map(({ id, author, content, url }, index) => {
                if (index < 2) {
                  return (
                    <Review
                      key={id}
                      author={author}
                      content={content}
                      url={url}
                    />
                  );
                }
                return false;
              })}
            </div>
          )}
          {reviews?.length === 0 && (
            <p className="modal__no-reviews">No reviews yet!</p>
          )}
        </>
      )}
    </div>
  );
};

export default Modal;
