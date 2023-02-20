import styles from './styles.module.scss';
import clsx from 'clsx';

function SaveButton(props) {
  return (
    <button
      onClick={props.onClick && props.onClick}
      className={clsx(
        styles.wrapper,
        props.noColor && styles.noBackground,
        props.login && styles.login
      )}
    >
      {props.title}
    </button>
  );
}

export default SaveButton;
