import { ColorButton } from '../Button/ColorButton';
import { NoColorButton } from '../Button/NoColorButton';
import styles from './Navigation.module.scss';
import logo from './../../logo.svg';
import React, { useState } from 'react';
import { Form } from '../Form';
import { RegForm } from '../RegistrationForm';
import { LoginForm } from '../LoginForm';

function Navigation(props) {
  const [isVisibleForm, setVisibleForm] = useState(false);
  const [isVisibleForm2, setVisibleForm2] = useState(false);
  const [isVisibleForm3, setVisibleForm3] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImage} alt='logo' />
        <div className={styles.logoTitle}>Domowe przepisy</div>
      </div>
      <div className={styles.buttons}>
        <NoColorButton
          title={'Logowanie'}
          onClick={() => setVisibleForm3(!isVisibleForm3)}
        />
        <NoColorButton
          title={'Rejestracja'}
          onClick={() => setVisibleForm2(!isVisibleForm2)}
        />
        <ColorButton
          title={'Dodaj przepis'}
          onClick={() => setVisibleForm(!isVisibleForm)}
        />
      </div>
      {isVisibleForm && <Form onClick={props.addRecipe} buttonName={'DODAJ'} />}
      {isVisibleForm2 && <RegForm buttonName={'ZAREJESTRUJ'} />}
      {isVisibleForm3 && <LoginForm buttonName={'ZALOGUJ'} />}
    </div>
  );
}

export default Navigation;
