import { SEARCH_INPUT } from '../../constants';
import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.wrapper}>
      <input className={styles.searchInput} placeholder={SEARCH_INPUT} />
    </div>
  );
}

export default Search;
