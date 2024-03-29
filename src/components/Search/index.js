import { TRANSLATION } from '../../constants';
import styles from './styles.module.scss';

function Search() {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.searchInput}
        placeholder={TRANSLATION.searchInput}
      />
    </div>
  );
}

export default Search;
