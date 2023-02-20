import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveButton } from '../../Buttons';
import { loginUser } from '../../../services/userService';
import { PATH, TRANSLATION } from '../../../constants';
import config from '../../../config.json';
import logo from './../../../logo.svg';
import backIcon from '../../../images/right-arrow.png';
import styles from './styles.module.scss';

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
    const t = await loginUser(email, password);
    console.log(t, '222');
    props.setRefreshAuth((old) => old + 1);
    props.setVisibleNavigation(true);
    navigate(PATH.MAIN);
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
        alt={TRANSLATION.RETURN}
        title={TRANSLATION.RETURN_PREV_PAGE}
      />
      <div className={styles.logoInput}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt={TRANSLATION.LOGO} />
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
        <SaveButton
          title={props.buttonName}
          login={true}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Login;
