import styles from './ColorButton.module.scss';
import clsx from 'clsx';

function ColorButton(props) {
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

export default ColorButton;
