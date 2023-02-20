import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavButton, SaveButton } from '../Buttons';
import { UserContext } from '../../App';
import { logoutUser } from '../../services/userService';
import logo from './../../logo.svg';
import { PATH, TRANSLATION } from '../../constants';
import config from '../../config.json';
import styles from './styles.module.scss';

const appTitle = config.appTitle;

function Navigation(props) {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      <div>
        <NavLink to={PATH.MAIN}>
          <div className={styles.logo}>
            <img
              src={logo}
              className={styles.logoImage}
              alt={TRANSLATION.LOGO}
            />
            <div className={styles.logoTitle}>{appTitle}</div>
          </div>
        </NavLink>
        <div className={styles.buttons}>
          {!userContext?.email && (
            <>
              <NavLink to={PATH.LOGIN}>
                <NavButton
                  title={TRANSLATION.LOGIN}
                  onClick={() => props.setVisibleNavigation(false)}
                />
              </NavLink>
              <NavLink to={PATH.REGISTRATION}>
                <NavButton
                  title={TRANSLATION.REGISTER}
                  onClick={() => props.setVisibleNavigation(false)}
                />
              </NavLink>
            </>
          )}
          {userContext?.email && (
            <NavLink to={PATH.MAIN}>
              <NavButton
                title={TRANSLATION.LOGOUT}
                onClick={async () => {
                  await logoutUser();
                  props.setUserSession({});
                }}
              />
            </NavLink>
          )}
          <NavLink to={PATH.ADD_RECIPES}>
            <SaveButton
              title={TRANSLATION.ADD_RECIPE}
              onClick={() => props.setVisibleNavigation(false)}
            />
          </NavLink>
        </div>
      </div>
      {userContext?.email}
    </div>
  );
}

export default Navigation;
