import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../constants';

import styles from './styles.module.scss';

function BackButton(props) {
  return (
    <Link to={props.link || PATH.main} className={styles.link}>
      {`< ${props.title || TRANSLATION.backMainPage}`}
    </Link>
  );
}

export default BackButton;
