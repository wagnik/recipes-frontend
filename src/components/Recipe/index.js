import React, { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../../services/recipeService';
import backIcon from '../../statics/images/right-arrow.png';
import editIcon from '../../statics/images/edit.svg';
import removeIcon from '../../statics/images/remove-icon.svg';
import styles from './styles.module.scss';
import { PATH, TRANSLATION } from '../../constants';

function Recipe(props) {
  const [recipe, setRecipe] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { title, description } = recipe;
  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipes();
  }, [id, props.refreshKey]);
  console.log(recipe)
  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.recipeWrapper}>
          <img src={recipe.img} alt={recipe.title} className={styles.bg}></img>
          <div className={styles.content}>
            <div className={styles.menu}>
              <Link
                to={PATH.MAIN}
                className={styles.link}
              >{`< wróć na stronę główną`}</Link>
              <div className={styles.icons}>
                <Link
                  to={`${PATH.EDIT}${recipe._id}`}
                  state={{ previousLocation: location }}
                >
                  <img
                    className={styles.editIcon}
                    src={editIcon}
                    alt={TRANSLATION.EDIT}
                    title={TRANSLATION.EDIT}
                  />
                </Link>
                <Link
                  to={PATH.MAIN}
                  onClick={() => {
                    deleteRecipe(recipe._id);
                    props.setRefreshKey((oldKey) => oldKey + 1);
                  }}
                >
                  <img
                    className={styles.removeIcon}
                    onClick={() => navigate(PATH.MAIN)}
                    src={removeIcon}
                    alt={TRANSLATION.REMOVE}
                    title={TRANSLATION.REMOVE}
                  />
                </Link>
              </div>
            </div>
            <div className={styles.recipeTitle}>{recipe.title}</div>
            <div className={styles.desc}>
              {recipe.ingredients && recipe.ingredients.length > 0 && <>
                  <p className={styles.descTitle}>Składniki</p>
                  <ul>
                    {recipe.ingredients && recipe.ingredients.map((i, index) => <li key={index}>{i}</li>)}
                  </ul>
                </>
              }
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
