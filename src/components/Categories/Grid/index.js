import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../../constants';
import rightArrow from '../../../statics/icons/rightArrow.svg';
import styles from './styles.module.scss';

function Grid(props) {
  const filteredRecipes =
    props &&
    props.recipes &&
    props.type &&
    props.recipes.filter((r) => r.type.includes(props.type));
  const recipes = props.type ? filteredRecipes : props && props.recipes;

  return (
    <div className={styles.wrapper}>
      <Link to={PATH.MAIN} className={styles.link}>
        {TRANSLATION.RETURN_MAIN_PAGE}
      </Link>
      <div>
        <div className={styles.recipes}>
          {recipes &&
            recipes.map((recipe, index) => {
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
                      <img
                        className={styles.icon}
                        src={rightArrow}
                        alt={'arrow'}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Grid;
