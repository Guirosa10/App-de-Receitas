/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect /* useState */ } from 'react';
import propTypes from 'prop-types';
import { /* Link */ useHistory } from 'react-router-dom';
import { HOUR, TIME_LIMITER } from '../../helpers/constants';

export default function FinishRecipeButton({
  setDisabled, count, datatestid, className, disabled, recipe, ingredients, isFood }) {
  useEffect(() => {
    if (recipe && ingredients.length > 0) {
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

  const history = useHistory();

  const getTime = () => {
    const now = new Date();
    let ampm = 'am';
    let hour = now.getHours();
    let minute = now.getMinutes();
    let seconds = now.getSeconds();
    if (hour >= HOUR) {
      if (hour > HOUR) hour -= HOUR;
      ampm = 'pm';
    }

    if (minute < TIME_LIMITER) minute = `0${minute}`;
    if (seconds < TIME_LIMITER) seconds = `0${seconds}`;
    return `${now.toLocaleDateString()} ${hour}:${minute}:${seconds} ${ampm}`;
  };

  const handleDoneRecipes = () => {
    const obj = {
      id: isFood ? recipe.idMeal : recipe.idDrink,
      type: isFood ? 'food' : 'drink',
      nationality: isFood ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: !isFood ? recipe.strAlcoholic : '',
      name: isFood ? recipe.strMeal : recipe.strDrink,
      image: isFood ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: getTime(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    const previousArray = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const saveNewArray = [...previousArray, obj];
    localStorage.setItem('doneRecipes', JSON.stringify(saveNewArray));
    history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      data-testid={ datatestid }
      className={ className }
      disabled={ disabled }
      onClick={ handleDoneRecipes }
    >
      Finish Recipe

    </button>
  );
}

FinishRecipeButton.propTypes = {
  datatestid: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
}.isRequired;
