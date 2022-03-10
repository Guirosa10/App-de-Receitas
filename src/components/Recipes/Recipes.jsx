import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';

const Recipes = ({ data }) => {
  const { isFood } = useContext(AppContext);

  return (
    data && data.map((item, index) => (
      <section
        key={ `${index}-recipe-card` }
        data-testid={ `${index}-recipe-card` }
      >
        <Link to={ isFood ? `/foods/${item.idMeal}` : `/drinks/${item.idDrink}` }>
          <img
            src={ item.strMealThumb || item.strDrinkThumb }
            alt="Recipe"
            data-testid={ `${index}-card-img` }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { item.strMeal || item.strDrink }
          </h3>
        </Link>
      </section>
    ))
  );
};

export default Recipes;
