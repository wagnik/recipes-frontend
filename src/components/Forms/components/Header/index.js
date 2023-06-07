import React from 'react';
import styles from './styles.module.scss';

function Header(props) {
  return <div className={styles.title}>{props.title}</div>;
}

export default Header;
