import React, { useState } from 'react';
import clsx from 'clsx';
import { TRANSLATION, WARNING_MESSAGE } from '../../../constants';

import styles from './styles.module.scss';
import showPasswordIcon from '../../../../statics/icons/showPassword.svg';
import hidePasswordIcon from '../../../../statics/icons/hidePassword.svg';

function Input(props) {
  const [displayedPassword, setDisplayedPassword] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);

  const togglePassword = () => {
    setDisplayedPassword(!displayedPassword);
  };

  const { missingField, wrongEmail, wrongPassword, wrongName } =
    WARNING_MESSAGE;

  const validateField = (type, value, submitClicked) => {
    const emailRegexp = /\S+@\S+\.\S+/;
    const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const textRegexp = /^[a-zA-Z0-9]{3,}$/;

    if (!value || (!value && submitClicked)) {
      return missingField;
    }
    if (value && type === 'email') {
      return !emailRegexp.test(value) && wrongEmail;
    }
    if (value && type === 'password' && props.isRegistration) {
      return !passwordRegexp.test(value) && wrongPassword;
    }
    if (value && type === 'name') {
      return !textRegexp.test(value) && wrongName;
    }
    return null;
  };

  const isFieldValid = props.submitClicked
    ? validateField(props.type, props.value, props.submitClicked)
    : inputClicked && validateField(props.type, props.value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formInput}>
        <img src={props.iconSrc} className={styles.icon} alt={props.type} />
        <input
          className={clsx(styles.input, isFieldValid && styles.warningInput)}
          value={props.value}
          placeholder={props.placeholder}
          type={displayedPassword ? 'text' : props.type}
          onChange={props.handleChange}
          onInput={() => setInputClicked(true)}
        />
      </div>
      {props.type === 'password' && props.value && (
        <>
          <div
            onClick={togglePassword}
            className={clsx(styles.iconWrapper, styles.iconWrapperRight)}
          >
            <img
              src={displayedPassword ? hidePasswordIcon : showPasswordIcon}
              className={styles.iconRight}
              alt={props.type}
              title={
                displayedPassword
                  ? TRANSLATION.hidePassword
                  : TRANSLATION.showPassword
              }
            />
          </div>
        </>
      )}
      {isFieldValid && (
        <div className={styles.warningMessage}>{isFieldValid}</div>
      )}
    </div>
  );
}

export default Input;
