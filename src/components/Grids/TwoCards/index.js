import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants';
import PlaceholderCard from '../PlaceholderCard';

import styles from './styles.module.scss';

function TwoCards(props) {
  const filteredRecipes =
    props &&
    props.recipes &&
    (props.type
      ? props.recipes.filter((r) => r.type.includes(props.type))
      : props.recipes);

  const latestRecipes = filteredRecipes && filteredRecipes.slice(-2).reverse();

  return (
    <div className={styles.wrapper}>
      {latestRecipes && latestRecipes.length > 0 ? (
        latestRecipes.map((recipe, index) => {
          return (
            <Link key={index} to={`${PATH.recipe}${recipe._id}`}>
              <div className={styles.card}>
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className={styles.image}
                ></img>
                <div className={styles.content}>
                  <div className={styles.title}>{recipe.title}</div>
                  <div className={styles.description}>{recipe.description}</div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <>
          <PlaceholderCard />
          <PlaceholderCard />
        </>
      )}{' '}
    </div>
  );
}

export default TwoCards;
