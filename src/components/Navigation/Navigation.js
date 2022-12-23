import React, { useContext } from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import { ColorButton } from '../Button/ColorButton';
import { NoColorButton } from '../Button/NoColorButton';
import { UserContext } from '../../App';
import { logoutUser } from '../../services/userService';
import logo from './../../logo.svg';
import styles from './Navigation.module.scss';
import { ADD_RECIPE, LOGIN, LOGO, LOGOUT, REGISTER } from '../../constants';
import config from '../../config.json';

const appTitle = config.appTitle;

function Navigation(props) {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div>
        <NavLink to='/'>
          <div className={styles.logo}>
            <img src={logo} className={styles.logoImage} alt={LOGO} />
            <div className={styles.logoTitle}>{appTitle}</div>
          </div>
        </NavLink>
        <div className={styles.buttons}>
          {!userContext?.email && (
            <>
              <NavLink to='/login'>
                <NoColorButton
                  title={LOGIN}
                  onClick={() => props.setVisibleNavigation(false)}
                />
              </NavLink>
              <NavLink to='/register'>
                <NoColorButton
                  title={REGISTER}
                  onClick={() => props.setVisibleNavigation(false)}
                />
              </NavLink>
            </>
          )}
          {userContext?.email && (
            <NavLink to={`/`}>
              <NoColorButton
                title={LOGOUT}
                onClick={async () => {
                  await logoutUser();
                  props.setUserSession({});
                }}
              />
            </NavLink>
          )}
          <NavLink to='/add-recipe'>
            <ColorButton
              title={ADD_RECIPE}
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
