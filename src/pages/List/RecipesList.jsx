import React, { useContext } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import RecipeCard from '../components/RecipeCard';
import mainContext from '../contexts/mainContext';

export default function Drinks() {
  const { recipes } = useContext(mainContext);
  return (
    <DefaultLayout pathname="/bebidas">
      { recipes.length > 1 ? <RecipeCard /> : <h1>Drinks</h1> }
    </DefaultLayout>
  );
}
