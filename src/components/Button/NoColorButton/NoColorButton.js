import styles from './NoColorButton.module.scss';

function NoColorButton(props) {
  return <button className={styles.wrapper}>{props.title}</button>;
}

export default NoColorButton;
