import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../../services/recipeService';
import backIcon from '../../images/right-arrow.png';
import editIcon from '../../images/edit.png';
import removeIcon from '../../images/remove-icon.png';
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.recipeWrapper}>
          <img
            className={styles.backIcon}
            onClick={() => navigate(PATH.MAIN)}
            src={backIcon}
            alt={TRANSLATION.RETURN}
            title={TRANSLATION.RETURN_MAIN_PAGE}
          />
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
          <Link to={`${PATH.EDIT}${recipe._id}`}>
            <img
              className={styles.editIcon}
              src={editIcon}
              alt={TRANSLATION.EDIT}
              title={TRANSLATION.EDIT}
            />
          </Link>
          <img src={recipe.img} alt={recipe.title} className={styles.bg}></img>
          <div className={styles.recipeTitle}>{recipe.title}</div>
          <div className={styles.description}>{recipe.description}</div>
          <div>{recipe.tags}</div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
