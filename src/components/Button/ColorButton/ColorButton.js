import styles from './ColorButton.module.scss';
import clsx from 'clsx';

function ColorButton(props) {
  return (
    <button
      className={clsx(styles.wrapper, props.noColor && styles.noBackground)}
    >
      {props.title}
    </button>
  );
}

export default ColorButton;
