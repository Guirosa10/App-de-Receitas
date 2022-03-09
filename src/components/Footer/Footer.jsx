import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
        data-testid="drinks-bottom-btn"
      >
        <img
          src={ drinkIcon }
          alt="Drinks"
          height="68"
          width="68"
        />
      </Link>
      <Link
        to="/explore"
        data-testid="explore-bottom-btn"
      >
        <img
          src={ exploreIcon }
          alt="Explore"
          height="68"
          width="68"
        />
      </Link>
      <Link
        to="/foods"
        data-testid="food-bottom-btn"
      >
        <img
          src={ mealIcon }
          alt="Foods"
          height="70"
          width="70"
        />
      </Link>
    </footer>
  );
}
