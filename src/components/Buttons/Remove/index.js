import React from 'react';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../../services/recipeService';
import { PATH, TRANSLATION } from '../../constants';

import styles from './styles.module.scss';
import removeIcon from '../../../statics/icons/remove.svg';

function RemoveButton(props) {
  return (
    <Link
      to={props.link || PATH.main}
      onClick={() => {
        deleteRecipe(props.recipe._id);
        props.setRefreshKey((oldKey) => oldKey + 1);
      }}
    >
      <img
        className={styles.icon}
        onClick={props.onClick}
        src={removeIcon}
        alt={TRANSLATION.remove}
        title={TRANSLATION.remove}
      />
    </Link>
  );
}

export default RemoveButton;
