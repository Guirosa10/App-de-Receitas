/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect /* useState */ } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FinishRecipeButton({
  setDisabled, count, datatestid, className, disabled, recipe, ingredients }) {
  useEffect(() => {
    if (recipe && ingredients) {
      console.log(recipe);
      console.log(ingredients);
      const filteredIngredients = (ingredients
        .filter((ingredient) => recipe[ingredient]));
      console.log(filteredIngredients.length);
      if (filteredIngredients.length > 0 && count >= filteredIngredients.length) {
        setDisabled(false);
      }
    }
  }, [recipe, ingredients]);

  return (
    <Link to="/done-recipes">
      <button
        type="button"
        data-testid={ datatestid }
        className={ className }
        disabled={ disabled }
      >
        Finish Recipe

      </button>
    </Link>
  );
}

FinishRecipeButton.propTypes = {
  datatestid: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
}.isRequired;
