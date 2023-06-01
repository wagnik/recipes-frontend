import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../constants';
import styles from './styles.module.scss';

function BackToButton(props) {
  return (
    <Link to={props.link || PATH.MAIN} className={styles.link}>
      {`< ${props.title || 'wróć na stronę główną'}`}
    </Link>
  );
}

export default BackToButton;
