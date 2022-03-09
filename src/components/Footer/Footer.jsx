import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <div>
        <Link
          to="/drinks"
        >
          <img
            src={ drinkIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
            height="68"
            width="68"
          />
        </Link>
        <Link
          to="/explore"
        >
          <img
            src={ exploreIcon }
            alt="Explore"
            data-testid="explore-bottom-btn"
            height="68"
            width="68"
          />
        </Link>
        <Link
          to="/foods"
        >
          <img
            src={ mealIcon }
            alt="Foods"
            data-testid="food-bottom-btn"
            height="70"
            width="70"
          />
        </Link>
      </div>
    </footer>
  );
}
