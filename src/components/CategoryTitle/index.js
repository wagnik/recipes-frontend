import { PATH } from '../../constants';
import { SaveButton } from '../Buttons';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function CategoryTitle(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{props.title}</div>
      <Link to={`${PATH.TYPE_RECIPES}${props.type}`} state={props.type}>
        <SaveButton
          className={styles.button}
          displayInline={true}
          title='Wyświetl wszystkie'
        />
      </Link>
    </div>
  );
}

export default CategoryTitle;
