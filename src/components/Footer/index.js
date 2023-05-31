import { NavLink } from 'react-router-dom';
import { PATH, TRANSLATION } from '../../constants';
import logo from './../../logo.svg';
import config from '../../config.json';
import styles from './styles.module.scss';

const appTitle = config.appTitle;

function Footer() {
  return (
    <div className={styles.wrapper}>
      <NavLink to={PATH.MAIN}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt={TRANSLATION.LOGO} />
          <div className={styles.logoTitle}>{appTitle}</div>
        </div>
      </NavLink>
      <div className={styles.copyright}>
        Copyright © 2023, domoweprzepisy.pl
      </div>
    </div>
  );
}

export default Footer;
