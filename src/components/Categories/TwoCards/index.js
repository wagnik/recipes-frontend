import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { PATH } from '../../../constants';
import styles from './styles.module.scss';

function TwoCards(props) {
  const filteredRecipes =
    props &&
    props.recipes &&
    props.recipes.filter((r) => r.type.includes(props.type));
  const latestRecipes = filteredRecipes && filteredRecipes; // zmienić na slice(-2) jak naprawię obrazki
  console.log(latestRecipes);
  return (
    <div
      className={clsx(
        styles.wrapper,
        latestRecipes.length === 1
          ? styles.wrapperOneElement && styles.oneCard
          : styles.manyCard
      )}
    >
      {latestRecipes &&
        latestRecipes.map((recipe, index) => {
          return (
            <Link key={index} to={`${PATH.RECIPE}${recipe._id}`}>
              <div className={styles.card}>
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className={styles.img}
                ></img>
                <div className={styles.content}>
                  <div className={styles.title}>{recipe.title}</div>
                  <div className={styles.description}>{recipe.description}</div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default TwoCards;
