import React from 'react';
import styles from './styles.module.scss';

function Title(props) {
  return props.title ? (
    <div className={styles.recipeTitle}>{props.title}</div>
  ) : (
    <div className={styles.titlePlaceholder}>&nbsp;</div>
  );
}

export default Title;
