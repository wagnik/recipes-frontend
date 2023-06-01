import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { fetchRecipe } from '../../services/recipeService';
import { PATH } from '../../constants';
import styles from './styles.module.scss';
import { BackToButton, EditButton, RemoveButton } from '../Buttons';
import Title from './Title';
import Author from './Author';
import Description from './Description';
import Image from './Image';

function Recipe(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const userContext = useContext(UserContext);

  const [recipe, setRecipe] = React.useState({});

  const { author } = recipe;

  const handleClick = () => navigate(PATH.MAIN);

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchRecipe(id).then((data) => setRecipe(data));
    };
    fetchRecipes();
  }, [id, props.refreshKey]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipeWrapper}>
        <Image src={recipe.img} title={recipe.title} />
        <div className={styles.content}>
          <BackToButton />
          {(author && author.id === userContext.id) || !author ? (
            <div className={styles.buttons}>
              <EditButton recipe={recipe} location={location} />
              <RemoveButton
                recipe={recipe}
                onClick={handleClick}
                setRefreshKey={props.setRefreshKey}
              />
            </div>
          ) : null}
          <Title title={recipe.title} />
          {author ? <Author author={author.name} /> : null}
          <Description
            ingredients={recipe.ingredients}
            description={recipe.description}
          />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
