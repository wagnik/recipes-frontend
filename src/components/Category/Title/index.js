import { Link } from 'react-router-dom';
import { ColorButton } from '../../Buttons';
import { PATH, TRANSLATION } from '../../constants';

import styles from './styles.module.scss';

function Title(props) {
  const linkCategory = props.type
    ? `${PATH.typeRecipes}${props.type}`
    : props.showAll && `${PATH.allRecipes}`;

  return (
    <div className={styles.wrapper}>
      {props.title ? (
        props.showAll ? (
          <Link to={linkCategory} state={props.type}>
            <div className={styles.title}>{props.title}</div>
          </Link>
        ) : (
          <div className={styles.onlyTitle}>{props.title}</div>
        )
      ) : (
        <div className={styles.titlePlaceholder} />
      )}
      {props.showAll && (
        <Link to={linkCategory} state={props.type}>
          <ColorButton displayInline={true} title={TRANSLATION.viewAll} />
        </Link>
      )}
    </div>
  );
}

export default Title;
