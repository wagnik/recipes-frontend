import styles from './styles.module.scss';
import clsx from 'clsx';

function ColorButton(props) {
  return (
    <button
      onClick={props.onClick && props.onClick}
      className={clsx(
        styles.wrapper,
        props.displayInline && styles.inline,
        props.form && styles.wrapperForm
      )}
    >
      {props.title}
    </button>
  );
}

export default ColorButton;
