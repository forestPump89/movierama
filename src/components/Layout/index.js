import React from 'react';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const loading = useSelector((state) => state.movies.loading);

  return (
    <div className={'hero ' + (loading ? 'hero-loading' : '')}>{children}</div>
  );
};

export default Layout;
