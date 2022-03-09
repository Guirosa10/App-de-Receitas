import React from 'react';

const Recipes = ({ data }) => (
  data.map((item, index) => (
    <section
      key={ `${index}-recipe-card` }
      data-testid={ `${index}-recipe-card` }
    >
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
    </section>
  ))
);

export default Recipes;
