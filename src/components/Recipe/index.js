import React, { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { fetchRecipe, deleteRecipe } from '../../services/recipeService';
import { PATH, TRANSLATION } from '../../constants';
import editIcon from '../../statics/images/edit.svg';
import removeIcon from '../../statics/images/remove-icon.svg';
import styles from './styles.module.scss';

function Recipe(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const userContext = useContext(UserContext);

  const [recipe, setRecipe] = React.useState({});

  const { author } = recipe;

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipes();
  }, [id, props.refreshKey]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipeWrapper}>
        <img src={recipe.img} alt={recipe.title} className={styles.image}></img>
        <div className={styles.content}>
          <div>
            <Link
              to={PATH.MAIN}
              className={styles.link}
            >{`< wróć na stronę główną`}</Link>
            {(author && author.id === userContext.id) || !author ? (
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
            ) : null}
          </div>
          <div className={styles.recipeTitle}>{recipe.title || 'Tytuł'}</div>
          {author && <div className={styles.author}> Autor: {author.name}</div>}
          <div className={styles.dash} />
          <div className={styles.description}>
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <>
                <p className={styles.descriptionTitle}>Składniki</p>
                <ul>
                  {recipe.ingredients &&
                    recipe.ingredients.map((i, index) => {
                      return i ? <li key={index}>{i}</li> : <br></br>;
                    })}
                </ul>
              </>
            )}
            <p className={styles.descriptionTitle}>Przygotowanie</p>
            <div className={styles.descriptionArea}>{recipe.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
