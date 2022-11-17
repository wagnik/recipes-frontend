import styles from './Category.module.scss';

function Category(props) {
  return (
    <div className={styles.wrapper}>
      <img
        src={props.image}
        alt={props.title}
        className={styles.categoryImage}
      ></img>
      <div className={styles.categoryTitle}>{props.title}</div>
    </div>
  );
}

export default Category;
