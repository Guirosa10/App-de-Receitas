import React, { /* useEffect  */} from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

function IngredientsInProgress({ isFood, id, ingredients, measures, recipes }) {
  /*  useEffect(() => {
    const checkStorage = () => {
      const objecto = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!objecto) {
        const ids = Object.keys(objecto.meals);
        if (!ids.includes(id)) {
        const newObj = isFood ? { meals: { [id]: [] }, cocktails: {} } : { meals: { [id]: [] }, cocktails: {} }
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
        }
      }
      const newObj = { meals: { [id]: [] }, cocktails: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    };
    checkStorage();
  }, []); */

  return (
    <ul style={ { listStyleType: 'none' } }>
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <Input
              isFood={ isFood }
              type="checkbox"
              id={ `${index}-ingredient` }
              filterId={ id }
              value={ recipes[ingredient] }
              measures={ recipes[measures[index]] }
              datatestid={ `${index}-ingredient` }
            />
          </li>
        )
        ))
      }
    </ul>
  );
}

export default IngredientsInProgress;

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
