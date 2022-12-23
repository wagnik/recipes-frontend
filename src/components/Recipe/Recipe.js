import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipe, deleteRecipe } from '../../services/recipeService';
import backIcon from '../../images/right-arrow.png';
import editIcon from '../../images/edit.png';
import removeIcon from '../../images/remove-icon.png';
import styles from './Recipe.module.scss';
import { EDIT, REMOVE, RETURN, RETURN_MAIN_PAGE } from '../../constants';

function Recipe(props) {
  const [recipe, setRecipe] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchRecipess = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipess();
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.test}>
        <div className={styles.recipeWrapper}>
          <img
            className={styles.backIcon}
            onClick={() => navigate('/')}
            src={backIcon}
            alt={RETURN}
            title={RETURN_MAIN_PAGE}
          />
          <Link
            to={`/`}
            onClick={() =>
              deleteRecipe(recipe._id).then(() =>
                props.setRefreshKey((oldKey) => oldKey + 1)
              )
            }
          >
            <img
              className={styles.removeIcon}
              onClick={() => navigate('/')}
              src={removeIcon}
              alt={REMOVE}
              title={REMOVE}
            />
          </Link>
          <Link to={`/edit/${recipe._id}`}>
            <img
              className={styles.editIcon}
              src={editIcon}
              alt={EDIT}
              title={EDIT}
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
