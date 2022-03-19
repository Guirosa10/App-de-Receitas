import React, { useState } from 'react';
import propTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ datatestid, id, type }) {
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleShare = () => {
    const pathname = type === 'food' ? `/foods/${id}` : `/drinks/${id}`;
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setIsShowingMessage(true);
    return shareRecipe;
  };

  return (
    <>
      <button
        type="button"
        onClick={ handleShare }
        id={ id }
      >
        <img
          data-testid={ datatestid }
          src={ shareIcon }
          alt="Share icon"
        />
      </button>
      { isShowingMessage ? <span>Link copied!</span> : null}
    </>
  );
}

ShareButton.propTypes = {
  onClick: propTypes.func,
  datatestid: propTypes.string,
  id: propTypes.string,
}.isRequired;
