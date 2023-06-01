import React from 'react';
import { Link } from 'react-router-dom';
import { deleteRecipe } from '../../../services/recipeService';
import { PATH, TRANSLATION } from '../../../constants';
import removeIcon from '../../../statics/images/remove-icon.svg';
import styles from './styles.module.scss';

function RemoveButton(props) {
  return (
    <Link
      to={props.link || PATH.MAIN}
      onClick={() => {
        deleteRecipe(props.recipe._id);
        props.setRefreshKey((oldKey) => oldKey + 1);
      }}
    >
      <img
        className={styles.removeIcon}
        onClick={props.onClick}
        src={removeIcon}
        alt={TRANSLATION.REMOVE}
        title={TRANSLATION.REMOVE}
      />
    </Link>
  );
}

export default RemoveButton;
