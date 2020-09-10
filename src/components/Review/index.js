import React from 'react';

const Review = ({ author, content, url }) => {
  return (
    <div className="review">
      <div className="review__upper">
        <i className="fa fa-user" />
        <div className="review__author">by {author}</div>
        <a
          className="review__url"
          href={url}
          target="_blank noopener noreferer"
        >
          <span> Full Review</span>
        </a>
      </div>
      <div className="review__content">{content}</div>
    </div>
  );
};

export default Review;
