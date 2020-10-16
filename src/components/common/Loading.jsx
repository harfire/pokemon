import React, { memo } from 'react';

const Loading = memo(() => {
  return (
    <>
      <span>Loading... </span>
      <span className="icon has-text-grey">
        <i className="fas fa-spinner fa-pulse" />
      </span>
    </>
  );
});

export default Loading;
