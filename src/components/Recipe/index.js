import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../../services/recipeService';
import backIcon from '../../statics/images/right-arrow.png';
import editIcon from '../../statics/images/edit.png';
import removeIcon from '../../statics/images/remove-icon.png';
import styles from './styles.module.scss';
import { PATH, TRANSLATION } from '../../constants';

function Recipe(props) {
  const [recipe, setRecipe] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipes();
  }, [id]);

  console.log(recipe);
  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.recipeWrapper}>
          <Link
            to={PATH.MAIN}
            onClick={() =>
              deleteRecipe(recipe._id).then(() =>
                props.setRefreshKey((oldKey) => oldKey + 1)
              )
            }
          >
            <img
              className={styles.removeIcon}
              onClick={() => navigate(PATH.MAIN)}
              src={removeIcon}
              alt={TRANSLATION.REMOVE}
              title={TRANSLATION.REMOVE}
            />
          </Link>
          {/* </Link>
          <Link to={`${PATH.EDIT}${recipe._id}`}>
            <img
              className={styles.editIcon}
              src={editIcon}
              alt={TRANSLATION.EDIT}
              title={TRANSLATION.EDIT}
            />
          </Link> */}
          <img src={recipe.img} alt={recipe.title} className={styles.bg}></img>
          <div className={styles.content}>
            <Link
              to={PATH.MAIN}
              className={styles.link}
            >{`< wróć na stronę główną`}</Link>
            <div className={styles.recipeTitle}>{recipe.title}</div>
            <div className={styles.desc}>
              <p className={styles.descTitle}>Przygotowanie</p>
              <div className={styles.description}>{recipe.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
