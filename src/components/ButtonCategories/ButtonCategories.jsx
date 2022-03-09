import React from 'react';
import PropTypes from 'prop-types';

const ButtonCategories = ({ list }) => {
  const handleClick = (strCategory) => {
    const teste = strCategory;
    return teste;
  };

  return (
    <section>
      { list.map(({ strCategory }, index) => (
        <button
          key={ `${index}-button-category` }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          { strCategory }
        </button>
      )) }
    </section>
  );
};

ButtonCategories.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonCategories;
