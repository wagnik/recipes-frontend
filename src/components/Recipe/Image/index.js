import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

function Image(props) {
  return props.src ? (
    <img
      src={props.src}
      alt={props.title}
      className={clsx(styles.image, props.preview && styles.preview)}
    ></img>
  ) : (
    <div className={styles.image} />
  );
}

export default Image;
