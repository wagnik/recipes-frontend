import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants';

import PlaceholderCard from '../PlaceholderCard';
import { BackButton } from '../../Buttons';

import styles from './styles.module.scss';
import rightArrowIcon from '../../../statics/icons/rightArrow.svg';

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

  const recipes = type
    ? filteredRecipes.reverse()
    : props && props.recipes.reverse();

  return (
    <div className={styles.wrapper}>
      <BackButton />
      <div>
        <div className={styles.recipes}>
          {recipes && recipes.length > 0 ? (
            recipes.map((recipe, index) => {
              return (
                <Link key={`card${index}`} to={`${PATH.recipe}${recipe._id}`}>
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
                        src={rightArrowIcon}
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
