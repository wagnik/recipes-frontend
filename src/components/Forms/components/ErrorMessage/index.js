import React from 'react';
import { ERROR_MESSAGE } from '../../../constants';

import styles from './styles.module.scss';
import warningIcon from '../../../../statics/icons/warning.svg';

function ErrorMessage(props) {
  return (
    ERROR_MESSAGE.hasOwnProperty(props.message) && (
      <div className={styles.wrapper}>
        <img className={styles.errorIcon} src={warningIcon} alt={'Warning'} />
        <div className={styles.errorMessage}>
          {ERROR_MESSAGE[props.message]}
        </div>
      </div>
    )
  );
}

export default ErrorMessage;
