/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { mealsAPI } from '../../services/api';
import Header from '../../components/Header/Header';

export default function Foods() {
  const [foods, setFoods] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMeals = async () => {
    const response = await mealsAPI();
    setFoods(response);
  };

  useEffect(() => {
    fetchMeals();
    console.log(foods);
  }, []);
  return (
    <Header title="Foods" />
  );
}
