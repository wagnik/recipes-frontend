import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../App';
import { logoutUser } from '../../services/userService';

import { TransparrentButton, ColorButton } from '../Buttons';

import { PATH, TRANSLATION } from '../constants';
import config from '../../config.json';

import styles from './styles.module.scss';
import logo from '../../statics/icons/logo.svg';

function Navigation(props) {
  const userContext = useContext(UserContext);

  const toCapitalise = (name) => {
    return name.toLowerCase().replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className={styles.wrapper}>
      <NavLink to={PATH.main}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt={TRANSLATION.logo} />
          <div className={styles.logoTitle}>{config.appTitle}</div>
        </div>
      </NavLink>
      <div className={styles.buttons}>
        {!userContext?.email && (
          <>
            <NavLink to={PATH.login}>
              <TransparrentButton title={TRANSLATION.login} />
            </NavLink>
            <NavLink to={PATH.register}>
              <ColorButton title={TRANSLATION.register} />
            </NavLink>
          </>
        )}
        {userContext?.email && (
          <>
            <NavLink to={window.location}>
              <TransparrentButton
                title={`${TRANSLATION.logout}, ${toCapitalise(
                  userContext?.name
                )}`}
                onClick={async () => {
                  await logoutUser().then(() => window.location.reload());
                  props.setUserSession({});
                }}
              />
            </NavLink>
            <NavLink to={PATH.addRecipe}>
              <ColorButton title={TRANSLATION.addRecipe} />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
