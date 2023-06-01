import { Link } from 'react-router-dom';
import { BgColorButton } from '../../Buttons';
import { PATH } from '../../../constants';
import styles from './styles.module.scss';

function Title(props) {
  const linkCategory = props.type
    ? `${PATH.TYPE_RECIPES}${props.type}`
    : `${PATH.ALL_RECIPES}`;

  return (
    <div className={styles.wrapper}>
      {props.title ? (
        <Link to={linkCategory} state={props.type}>
          <div className={styles.title}>{props.title}</div>
        </Link>
      ) : (
        <div className={styles.titlePlaceholder} />
      )}
      <Link to={linkCategory} state={props.type}>
        <BgColorButton displayInline={true} title='Wyświetl wszystkie' />
      </Link>
    </div>
  );
}

export default Title;
