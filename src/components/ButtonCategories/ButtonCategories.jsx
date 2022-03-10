import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import { mealsAPI, cocktailsAPI } from '../../services/api';
import Button from '../Button/Button';

const ButtonCategories = ({ list }) => {
  const { isFood, setMeals, setDrinks } = useContext(AppContext);

  const handleAllButton = async () => {
    if (isFood) {
      const results = await mealsAPI();
      results.length = 12;
      setMeals(results);
    } else {
      const results = await cocktailsAPI();
      results.length = 12;
      setDrinks(results);
    }
  };

  return (
    <main>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleAllButton }
        >
          All
        </button>
        { list.map(({ strCategory }, index) => (
          <div
            key={ `${index}-button-category` }
          >
            <Button
              dataTestId={ `${strCategory}-category-filter` }
              name={ strCategory }
            >
              { strCategory }
            </Button>
          </div>
        )) }
      </section>
    </main>
  );
};

ButtonCategories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonCategories;
