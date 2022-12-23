import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorButton } from '../../Button/ColorButton';
import { loginUser } from '../../../services/userService';
import { LOGO, RETURN, RETURN_PREV_PAGE } from '../../../constants';
import config from '../../../config.json';
import logo from './../../../logo.svg';
import backIcon from '../../../images/right-arrow.png';
import styles from './Login.module.scss';

function Login(props) {
  const appTitle = config.appTitle;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const handleClick = async () => {
    await loginUser(email, password);
    props.setRefreshAuth((old) => old + 1);
    props.setVisibleNavigation(true);
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.backIcon}
        onClick={() => {
          navigate(-1);
          props.setVisibleNavigation(true);
        }}
        src={backIcon}
        alt={RETURN}
        title={RETURN_PREV_PAGE}
      />
      <div className={styles.logoInput}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt={LOGO} />
          <div className={styles.logoTitle}>{appTitle}</div>
        </div>
      </div>
      <div className={styles.inputs}>
        <div>
          <p>EMAIL</p>
          <input
            value={email}
            type={'email'}
            onChange={handleChange('email')}
          />
        </div>
        <div>
          <p>HASŁO</p>
          <input value={password} onChange={handleChange('password')} />
        </div>
      </div>
      <div className={styles.button}>
        <ColorButton
          title={props.buttonName}
          login={true}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Login;
