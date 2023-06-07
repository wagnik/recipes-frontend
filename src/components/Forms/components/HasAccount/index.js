import React from 'react';
import { Link } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../../constants';

import styles from './styles.module.scss';

function HasAccount(props) {
  const { backMainPage, hasAccount, hasNoAccount, login, register } =
    TRANSLATION;

  return (
    <div className={styles.info}>
      <p className={styles.noHasAccount}>
        {props.noAccount ? hasNoAccount : hasAccount}{' '}
        <Link to={props.link} className={styles.link}>
          {props.noAccount ? register : login}
        </Link>
      </p>
      <p>
        <Link to={PATH.main} className={styles.link}>
          {backMainPage}
        </Link>
      </p>
    </div>
  );
}

export default HasAccount;
