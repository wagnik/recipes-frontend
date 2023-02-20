import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveButton } from '../../Buttons';
import { registerUser } from '../../../services/userService';
import { PATH, TRANSLATION } from '../../../constants';
import logo from './../../../logo.svg';
import backIcon from '../../../images/right-arrow.png';
import styles from './styles.module.scss';

function Registration(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [register, setRegister] = useState(false);
  const [warning, setWarning] = useState(false);
  const { name, email, password } = values;

  const handleChange = (fieldName) => (event) => {
    setValues({
      ...values,
      [fieldName]: event.target.value,
    });
  };

  const handleClick = async () => {
    if (!name || !email || !password) {
      setWarning(true);
      return;
    }
    await registerUser(name, email, password).then(() => setRegister(true));
  };

  return (
    <div>
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
            <img
              src={logo}
              className={styles.logoImage}
              alt={TRANSLATION.LOGO}
            />
            <div className={styles.logoTitle}>Domowe przepisy</div>
          </div>
        </div>
        <div className={styles.inputs}>
          <div>
            <p>IMIĘ</p> <input value={name} onChange={handleChange('name')} />
            <p>EMAIL</p>
            <input
              value={email}
              type={'email'}
              onChange={handleChange('email')}
            />
            <p>HASŁO</p>{' '}
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
      {warning && (
        <div className={styles.register}>{`Uzupełnij brakujące pola`}</div>
      )}
      {register && (
        <div className={styles.register}>
          Użytkownik został zarejestrowany.{' '}
          <p
            className={styles.link}
            onClick={() => {
              props.setVisibleNavigation(false);
              navigate(PATH.LOGIN);
            }}
          >
            zaloguj się
          </p>{' '}
          bądź wróć na{' '}
          <p
            className={styles.link}
            onClick={() => {
              props.setVisibleNavigation(true);
              navigate(PATH.MAIN);
            }}
          >
            stronę główną
          </p>
        </div>
      )}
    </div>
  );
}

export default Registration;
