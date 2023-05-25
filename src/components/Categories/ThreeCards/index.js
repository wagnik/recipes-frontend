import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../constants';
import styles from './styles.module.scss';

function ThreeCards(props) {
  const filteredRecipes =
    props &&
    props.recipes &&
    props.recipes.filter((r) => r.type.includes(props.type));
  const latestRecipes = filteredRecipes && filteredRecipes.slice(-3).reverse(); // zmienić na slice(-3) jak naprawię obrazki

  return (
    <div className={styles.wrapper}>
      {latestRecipes &&
        latestRecipes.map((recipe, index) => {
          return (
            <Link key={`card${index}`} to={`${PATH.RECIPE}${recipe._id}`}>
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

export default ThreeCards;
