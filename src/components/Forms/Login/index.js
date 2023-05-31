import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/userService';
import { BgColorButton } from '../../Buttons';
import {
  PATH,
  TRANSLATION,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from '../../../constants';
import mail from '../../../statics/icons/mail.svg';
import unlock from '../../../statics/icons/unlock.svg';
import showPass from '../../../statics/icons/showPass.svg';
import hidePass from '../../../statics/icons/hidePass.svg';
import x from '../../../statics/icons/x.svg';
import styles from './login.module.scss';

function Login(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [displayedPassword, setDisplayedPassword] = useState(false);
  const [message, setMessage] = useState('');

  const { email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const togglePassword = () => {
    setDisplayedPassword(!displayedPassword);
  };

  const handleClick = async () => {
    const result = await loginUser(email, password);

    setMessage(result.message);
    props.setMessage(result.message);

    if (SUCCESS_MESSAGE.hasOwnProperty(result.message)) {
      props.setRefreshAuth((old) => old + 1);
      navigate(PATH.MAIN);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{TRANSLATION.LOGIN}</div>
      <div className={styles.formInput}>
        <div className={styles.iconWrapper}>
          <img src={mail} className={styles.icon} alt={TRANSLATION.LOGO} />
        </div>
        <input
          className={styles.input}
          value={email}
          placeholder={'Adres mailowy'}
          type={'email'}
          onChange={handleChange('email')}
        />
      </div>
      <div className={styles.formInput}>
        <div className={styles.iconWrapper}>
          <img src={unlock} className={styles.icon} alt={TRANSLATION.LOGO} />
        </div>
        <input
          className={clsx(styles.input, styles.passwordInput)}
          value={password}
          placeholder={'Hasło'}
          type={displayedPassword ? 'text' : 'password'}
          onChange={handleChange('password')}
        />
        <div
          onClick={togglePassword}
          className={clsx(styles.iconWrapper, styles.iconWrapperRight)}
        >
          <img
            src={displayedPassword ? hidePass : showPass}
            className={styles.icon}
            alt={TRANSLATION.LOGO}
          />
        </div>
      </div>
      <div className={styles.button}>
        <BgColorButton
          title={props.buttonName}
          form={true}
          onClick={handleClick}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.noAccountInfo}>
          Nie posiadasz konta?{' '}
          <Link to={PATH.REGISTRATION} className={styles.link}>
            Zarejestruj się
          </Link>
        </p>
        <p>
          <Link to={PATH.MAIN} className={styles.link}>
            Wróć na stronę główną
          </Link>
        </p>
      </div>
      {ERROR_MESSAGE.hasOwnProperty(message) && (
        <div className={styles.errorMessage}>
          <div className={styles.text}>{ERROR_MESSAGE[message]}</div>
          <img
            src={x}
            className={styles.icon}
            alt={'x'}
            onClick={() => setMessage('')}
          />
        </div>
      )}
    </div>
  );
}

export default Login;
