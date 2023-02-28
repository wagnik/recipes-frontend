import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavButton, SaveButton } from '../Buttons';
import { UserContext } from '../../App';
import { logoutUser } from '../../services/userService';
import logo from './../../logo.svg';
import { PATH, SUCCESS_MESSAGE, TRANSLATION } from '../../constants';
import config from '../../config.json';
import styles from './styles.module.scss';
import x from '../../statics/icons/x.svg';

const appTitle = config.appTitle;

function Navigation(props) {
  const userContext = useContext(UserContext);
  const [message, setMessage] = useState('');

  const toCapitalise = (name) => {
    return name.toLowerCase().replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className={styles.wrapper}>
      <NavLink to={PATH.MAIN}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt={TRANSLATION.LOGO} />
          <div className={styles.logoTitle}>{appTitle}</div>
        </div>
      </NavLink>
      <div className={styles.buttons}>
        {!userContext?.email && (
          <>
            <NavLink to={PATH.LOGIN}>
              <NavButton title={TRANSLATION.LOGIN} />
            </NavLink>
            <NavLink to={PATH.REGISTRATION}>
              <SaveButton title={TRANSLATION.REGISTER} />
            </NavLink>
          </>
        )}
        {userContext?.email && (
          <>
            <NavLink to={PATH.MAIN}>
              <NavButton
                title={`${TRANSLATION.LOGOUT}, ${toCapitalise(
                  userContext?.name
                )}`}
                onClick={async () => {
                  const result = await logoutUser();
                  setMessage(result.message);
                  props.setUserSession({});
                }}
              />
            </NavLink>
            <NavLink to={PATH.ADD_RECIPE}>
              <SaveButton title={TRANSLATION.ADD_RECIPE} />
            </NavLink>
          </>
        )}
        {SUCCESS_MESSAGE.hasOwnProperty(message) && (
          <div className={styles.message}>
            {SUCCESS_MESSAGE[message]}
            <br></br>
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

export default Navigation;
