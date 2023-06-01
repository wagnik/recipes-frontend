import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../../constants';
import rightArrow from '../../../statics/icons/rightArrow.svg';
import styles from './styles.module.scss';
import PlaceholderCard from '../PlaceholderCard';

function Grid(props) {
  const typeAddedToURL = window.location.href.split('/')[4]
    ? decodeURI(window.location.href.split('/')[4])
    : undefined;
  const type = props.type || typeAddedToURL;
  const filteredRecipes =
    props &&
    props.recipes &&
    type &&
    props.recipes.filter((r) => r.type.includes(type));

  const recipes = type ? filteredRecipes.reverse() : props && props.recipes;

  return (
    <div className={styles.wrapper}>
      <Link to={PATH.MAIN} className={styles.link}>
        {TRANSLATION.RETURN_MAIN_PAGE}
      </Link>
      <div>
        <div className={styles.recipes}>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              return (
                <Link key={`card${index}`} to={`${PATH.RECIPE}${recipe._id}`}>
                  <div className={styles.card}>
                    <img
                      src={recipe.img}
                      alt={recipe.title}
                      className={styles.image}
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
            })
          ) : (
            <>
              <PlaceholderCard size={'grid'} />
              <PlaceholderCard size={'grid'} />
              <PlaceholderCard size={'grid'} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grid;
