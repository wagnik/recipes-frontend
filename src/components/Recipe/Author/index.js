import React from 'react';
import styles from './styles.module.scss';

function Author(props) {
  return props.author ? (
    <div className={styles.author}> Autor: {props.author}</div>
  ) : (
    <div className={styles.authorPlaceholder}>&nbsp;</div>
  );
}

export default Author;
