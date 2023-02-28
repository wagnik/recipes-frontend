import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { SaveButton } from '../../Buttons';
import { registerUser } from '../../../services/userService';
import {
  PATH,
  TRANSLATION,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../../constants';
import logo from './../../../logo.svg';
import backIcon from '../../../statics/images/right-arrow.png';
import styles from './styles.module.scss';
import mail from '../../../statics/icons/mail.svg';
import unlock from '../../../statics/icons/unlock.svg';
import user from '../../../statics/icons/user.svg';
import showPass from '../../../statics/icons/showPass.svg';
import hidePass from '../../../statics/icons/hidePass.svg';
import x from '../../../statics/icons/x.svg';

function Registration(props) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState('');
  const { name, email, password } = values;
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClick = async () => {
    const result = await registerUser(name, email, password);
    // const t = await registerUser(name, email, password).then(() => {
    //   setRegister(true);
    setMessage(result.message);
    setRegister(true);
  };
  console.log(register);
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.heading}>{TRANSLATION.REGISTER}</div>
        <div className={styles.formInput}>
          <div className={styles.iconWrapper}>
            <img src={user} className={styles.icon} alt={TRANSLATION.LOGO} />
          </div>
          <input
            className={styles.input}
            required={true}
            value={name}
            placeholder={'Imię'}
            type={'text'}
            onChange={handleChange('name')}
          />
        </div>
        <div className={styles.formInput}>
          <div className={styles.iconWrapper}>
            <img src={mail} className={styles.icon} alt={TRANSLATION.LOGO} />
          </div>
          <input
            className={styles.input}
            value={email}
            required={true}
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
            required={true}
            placeholder={'Hasło'}
            type={passwordShown ? 'text' : 'password'}
            onChange={handleChange('password')}
          />
          <div
            onClick={togglePassword}
            className={clsx(styles.iconWrapper, styles.iconWrapperRight)}
          >
            <img
              src={passwordShown ? hidePass : showPass}
              className={styles.icon}
              alt={TRANSLATION.LOGO}
            />
          </div>
        </div>
        <div className={styles.button}>
          <SaveButton
            title={props.buttonName}
            form={true}
            onClick={handleClick}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.noAccountInfo}>
            Posiadasz już konto?{' '}
            <Link to={PATH.LOGIN} className={styles.link}>
              Zaloguj się
            </Link>
          </p>
          <p>
            <Link to={PATH.MAIN} className={styles.link}>
              Wróć na stronę główną
            </Link>
          </p>
        </div>
        {SUCCESS_MESSAGE.hasOwnProperty(message) && (
          <div className={styles.message}>
            {SUCCESS_MESSAGE[message]}
            <br></br>
            Możesz teraz{' '}
            <Link to={PATH.LOGIN} className={styles.link}>
              zalogować się
            </Link>{' '}
            przy użyciu wybranego e-maila lub{' '}
            <Link to={PATH.MAIN} className={styles.link}>
              wrócić na stronę główną
            </Link>
            <img
              src={x}
              className={styles.icon}
              alt={'x'}
              onClick={() => setMessage('')}
            />
          </div>
        )}
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
    </div>
  );
}

export default Registration;
