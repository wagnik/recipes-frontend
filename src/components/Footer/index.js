import { NavLink } from 'react-router-dom';
import { PATH, TRANSLATION } from '../constants';
import config from '../../config.json';

import styles from './styles.module.scss';
import logo from './../../logo.svg';

function Footer(props) {
  return (
    !props.showModal && (
      <div className={styles.wrapper}>
        <NavLink to={PATH.main}>
          <div className={styles.logo}>
            <img
              src={logo}
              className={styles.logoImage}
              alt={TRANSLATION.logo}
            />
            <div className={styles.logoTitle}>{config.appTitle}</div>
          </div>
        </NavLink>
        <div className={styles.copyright}>{TRANSLATION.footerCopyright}</div>
      </div>
    )
  );
}

export default Footer;
