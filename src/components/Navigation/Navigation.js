import { ColorButton } from '../Button/ColorButton';
import { NoColorButton } from '../Button/NoColorButton';
import styles from './Navigation.module.scss';
import logo from './../../logo.svg';

function Navigation() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImage} alt='logo' />
        <div className={styles.logoTitle}>Domowe przepisy</div>
      </div>
      <div className={styles.buttons}>
        <NoColorButton title={'Logowanie'} />
        <NoColorButton title={'Rejestracja'} />
        <ColorButton title={'Dodaj przepis'} />
      </div>
    </div>
  );
}

export default Navigation;
