import styles from './styles.module.scss';

function NavButton(props) {
  return (
    <button onClick={props.onClick && props.onClick} className={styles.wrapper}>
      {props.title}
    </button>
  );
}

export default NavButton;
