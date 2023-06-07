import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

function Image(props) {
  return props.src ? (
    <img
      src={props.src}
      alt={props.title}
      className={clsx(
        styles.image,
        props.preview && styles.preview,
        props.edit && styles.edit
      )}
    ></img>
  ) : (
    <div className={clsx(styles.imagePlaceholder, props.edit && styles.edit)} />
  );
}

export default Image;
