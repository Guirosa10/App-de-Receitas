import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneRecipesCard({ data }) {
  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const handleShare = (param) => {
    const pathname = param.type === 'food' ? `/foods/${param.id}` : `/drinks/${param.id}`;
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setIsShowingMessage(true);
    return shareRecipe;
  };

  return (
    data && data.map((item, index) => (
      <section key={ `${index}-done-recipe-card` }>
        <Link to={ item.type === 'food' ? `/foods/${item.id}` : `/drinks/${item.id}` }>
          <img
            src={ item.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
            width="360px"
          />
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            { item.name }
          </h3>
        </Link>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { item.nationality }
          { item.type === 'food' ? ' - ' : null}
          { item.category }
          {
            item.type === 'drink' && (
              <p>{ item.alcoholicOrNot }</p>
            )
          }
        </h4>
        <h4 data-testid={ `${index}-horizontal-done-date` }>
          { item.doneDate }
        </h4>
        {
          item.type === 'food' && (
            <>
              <p>{ item.nationality }</p>
              {
                item.tags.map((element) => (
                  <p
                    key={ element }
                    data-testid={ `${index}-${element}-horizontal-tag` }
                  >
                    { element }
                  </p>
                ))
              }
            </>
          )
        }

        <button
          type="button"
          onClick={ () => handleShare(item) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share icon"
          />
        </button>
        { isShowingMessage ? <span>Link copied!</span> : null}
      </section>
    ))
  );
}

DoneRecipesCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
