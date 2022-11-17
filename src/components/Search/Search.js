import styles from './Search.module.scss';

function Search() {
  return (
    <div className={styles.wrapper}>
      <input className={styles.searchInput} placeholder='Wyszukaj przepis' />
    </div>
  );
}

export default Search;
