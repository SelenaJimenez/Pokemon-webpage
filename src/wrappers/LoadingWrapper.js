import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
const LoadingWrapper = ({ children, loading, message = 'Cargando....', title = '' }) => {
  if (loading) {
    return (
      <div>
        <h4>{title}</h4>
        <Spinner animation="border" size="lg" />
        <h4>{message}</h4>
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default LoadingWrapper;
