import { ColorButton } from '../Button/ColorButton';
import { NoColorButton } from '../Button/NoColorButton';
import styles from './Navigation.module.scss';
import logo from './../../logo.svg';
import React, { useState } from 'react';
import { Form } from '../Form';

function Navigation(props) {
  const [isVisibleForm, setVisibleForm] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImage} alt='logo' />
        <div className={styles.logoTitle}>Domowe przepisy</div>
      </div>
      <div className={styles.buttons}>
        <NoColorButton title={'Logowanie'} />
        <NoColorButton title={'Rejestracja'} />
        <ColorButton
          title={'Dodaj przepis'}
          onClick={() => setVisibleForm(!isVisibleForm)}
        />
      </div>
      {isVisibleForm && <Form onClick={props.addRecipe} buttonName={'DODAJ'} />}
    </div>
  );
}

export default Navigation;
