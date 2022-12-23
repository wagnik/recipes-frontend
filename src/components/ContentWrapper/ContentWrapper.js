import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContentWrapper.module.scss';

function Content(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div className={styles.test}>
          {props && props.recipes && props.recipes.length > 0
            ? props.recipes.map((recipe) => {
                return (
                  <Link to={`/recipe/${recipe._id}`}>
                    <div className={styles.recipeWrapper}>
                      <img
                        src={recipe.img}
                        alt={recipe.title}
                        className={styles.bg}
                      ></img>
                      <div className={styles.recipeTitle}>{recipe.title}</div>
                      <div>{recipe.tags}</div>
                    </div>
                  </Link>
                );
              })
            : 'TEST'}
        </div>
      </div>
    </div>
  );
}

export default Content;
