import styles from './NoColorButton.module.scss';

function NoColorButton(props) {
  return (
    <button onClick={props.onClick && props.onClick} className={styles.wrapper}>
      {props.title}
    </button>
  );
}

export default NoColorButton;
